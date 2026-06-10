import { Project, SyntaxKind, Node } from "ts-morph";
import * as fs from "fs";
import * as path from "path";

const EN_JSON_PATH = path.join(process.cwd(), "messages", "en.json");
const AR_JSON_PATH = path.join(process.cwd(), "messages", "ar.json");

function toCamelCase(str: string): string {
  const words = str.replace(/[^a-zA-Z0-9]/g, ' ').trim().split(/\s+/);
  if (words.length === 0 || words[0] === '') return '';
  return words.map((w, i) => {
    return i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
  }).join('').substring(0, 40); // limit length
}

async function main() {
  console.log("Starting i18n migration...");
  
  const project = new Project({
    tsConfigFilePath: "tsconfig.json",
  });

  const sourceFiles = project.getSourceFiles("src/components/**/*.tsx");
  
  const enJson = JSON.parse(fs.readFileSync(EN_JSON_PATH, "utf-8"));
  const arJson = JSON.parse(fs.readFileSync(AR_JSON_PATH, "utf-8"));

  let totalReplacements = 0;

  for (const sourceFile of sourceFiles) {
    const componentName = sourceFile.getBaseNameWithoutExtension();
    let fileModified = false;
    
    // Ignore already migrated files to prevent conflicts
    if (componentName === "Navbar" || componentName === "Hero") {
      continue;
    }

    const conditionals = sourceFile.getDescendantsOfKind(SyntaxKind.ConditionalExpression);
    let keyIndex = 1;
    let componentEnKeys: Record<string, string> = {};
    let componentArKeys: Record<string, string> = {};

    for (const cond of conditionals) {
      const condition = cond.getCondition().getText().trim();
      
      // Match `isAr` or `locale === "ar"` or `locale === 'ar'`
      if (condition === "isAr" || condition === "locale === \"ar\"" || condition === "locale === 'ar'") {
        const trueExpr = cond.getWhenTrue();
        const falseExpr = cond.getWhenFalse();
        
        if (Node.isStringLiteral(trueExpr) && Node.isStringLiteral(falseExpr)) {
          const arText = trueExpr.getLiteralText();
          const enText = falseExpr.getLiteralText();
          
          let cleanEn = toCamelCase(enText);
          if (!cleanEn) cleanEn = `text${keyIndex}`;
          
          let keyName = cleanEn;
          let counter = 1;
          while (componentEnKeys[keyName] && componentEnKeys[keyName] !== enText) {
            keyName = `${cleanEn}${counter}`;
            counter++;
          }
          
          componentEnKeys[keyName] = enText;
          componentArKeys[keyName] = arText;
          
          cond.replaceWithText(`t("${keyName}")`);
          fileModified = true;
          totalReplacements++;
          keyIndex++;
        }
      }
    }

    if (fileModified) {
      console.log(`Modified ${componentName}.tsx - added ${Object.keys(componentEnKeys).length} keys.`);
      
      // 1. Add hook call `const t = useTranslations("ComponentName");`
      // We look for the main component function
      const funcDecl = sourceFile.getFunction(componentName) || 
                       sourceFile.getVariableDeclaration(componentName)?.getInitializerIfKind(SyntaxKind.ArrowFunction);
                       
      if (funcDecl) {
        // Find existing useTranslations
        const body = funcDecl.getBody();
        if (body && Node.isBlock(body)) {
          const existingT = body.getVariableStatement(v => v.getText().includes('useTranslations'));
          if (!existingT) {
            body.insertStatements(0, `const t = useTranslations('${componentName}');`);
          }
        }
      } else {
        // Fallback for default exports or other structures
        const exportAssignments = sourceFile.getExportAssignments();
        // For simplicity, we just inject at the top of the first function body we find that looks like a component
        const allFunctions = sourceFile.getFunctions();
        if (allFunctions.length > 0) {
           const body = allFunctions[0].getBody();
           if (body && Node.isBlock(body)) {
              const existingT = body.getVariableStatement(v => v.getText().includes('useTranslations'));
              if (!existingT) {
                body.insertStatements(0, `const t = useTranslations('${componentName}');`);
              }
           }
        }
      }

      // 2. Add import for `useTranslations` if missing
      const imports = sourceFile.getImportDeclarations();
      const hasNextIntl = imports.some(imp => imp.getModuleSpecifierValue() === 'next-intl');
      if (!hasNextIntl) {
        sourceFile.addImportDeclaration({
          namedImports: ['useTranslations'],
          moduleSpecifier: 'next-intl'
        });
      } else {
        const nextIntlImport = imports.find(imp => imp.getModuleSpecifierValue() === 'next-intl');
        if (nextIntlImport && !nextIntlImport.getNamedImports().some(ni => ni.getName() === 'useTranslations')) {
          nextIntlImport.addNamedImport('useTranslations');
        }
      }
      
      // Save changes to JSON objects
      enJson[componentName] = { ...enJson[componentName], ...componentEnKeys };
      arJson[componentName] = { ...arJson[componentName], ...componentArKeys };
    }
  }

  // Save the project files
  await project.save();
  
  // Save the JSON files
  fs.writeFileSync(EN_JSON_PATH, JSON.stringify(enJson, null, 2));
  fs.writeFileSync(AR_JSON_PATH, JSON.stringify(arJson, null, 2));

  console.log(`\nMigration complete! Replaced ${totalReplacements} inline translations.`);
}

main().catch(console.error);
