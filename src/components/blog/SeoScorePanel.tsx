'use client';

import { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, AlertCircle, TrendingUp } from 'lucide-react';

interface SeoProps {
  title: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  onScoreChange?: (score: number) => void;
}

export default function SeoScorePanel({
  title,
  content,
  metaTitle,
  metaDescription,
  focusKeyword,
  onScoreChange
}: SeoProps) {
  const [score, setScore] = useState(0);
  const [checks, setChecks] = useState<any[]>([]);

  useEffect(() => {
    let currentScore = 0;
    const newChecks = [];

    const keyword = focusKeyword.toLowerCase().trim();
    const contentText = content.replace(/<[^>]*>?/gm, '').toLowerCase();
    
    // 1. Focus Keyword exists
    if (keyword) {
      newChecks.push({
        id: 'keyword-exists',
        title: 'Focus Keyword Set',
        passed: true,
        score: 10
      });
      currentScore += 10;

      // 2. Keyword in title
      if (title.toLowerCase().includes(keyword)) {
        newChecks.push({
          id: 'keyword-in-title',
          title: 'Keyword in Article Title',
          passed: true,
          score: 15
        });
        currentScore += 15;
      } else {
        newChecks.push({
          id: 'keyword-in-title',
          title: 'Keyword in Article Title',
          passed: false,
          score: 0
        });
      }

      // 3. Keyword in Meta Title
      if (metaTitle.toLowerCase().includes(keyword)) {
        newChecks.push({
          id: 'keyword-in-meta-title',
          title: 'Keyword in Meta Title',
          passed: true,
          score: 10
        });
        currentScore += 10;
      } else {
        newChecks.push({
          id: 'keyword-in-meta-title',
          title: 'Keyword in Meta Title',
          passed: false,
          score: 0
        });
      }

      // 4. Keyword in Meta Description
      if (metaDescription.toLowerCase().includes(keyword)) {
        newChecks.push({
          id: 'keyword-in-meta-desc',
          title: 'Keyword in Meta Description',
          passed: true,
          score: 10
        });
        currentScore += 10;
      } else {
        newChecks.push({
          id: 'keyword-in-meta-desc',
          title: 'Keyword in Meta Description',
          passed: false,
          score: 0
        });
      }

      // 5. Keyword Density
      const keywordRegex = new RegExp(keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      const matches = contentText.match(keywordRegex);
      const count = matches ? matches.length : 0;
      const density = count > 0 && contentText.split(' ').length > 0 ? (count / contentText.split(' ').length) * 100 : 0;
      
      if (density >= 0.5 && density <= 2.5) {
        newChecks.push({
          id: 'keyword-density',
          title: `Keyword Density (${density.toFixed(1)}%)`,
          passed: true,
          score: 15
        });
        currentScore += 15;
      } else {
        newChecks.push({
          id: 'keyword-density',
          title: `Keyword Density (${density.toFixed(1)}%) - Aim for 0.5% - 2.5%`,
          passed: false,
          score: 0
        });
      }
    } else {
      newChecks.push({
        id: 'no-keyword',
        title: 'Set a Focus Keyword to get SEO suggestions',
        passed: false,
        score: 0
      });
    }

    // 6. Meta Title Length
    if (metaTitle.length >= 30 && metaTitle.length <= 60) {
      newChecks.push({
        id: 'meta-title-length',
        title: 'Meta Title Length (30-60 chars)',
        passed: true,
        score: 10
      });
      currentScore += 10;
    } else {
      newChecks.push({
        id: 'meta-title-length',
        title: `Meta Title Length (${metaTitle.length} chars) - Aim for 30-60`,
        passed: false,
        score: 0
      });
    }

    // 7. Meta Description Length
    if (metaDescription.length >= 120 && metaDescription.length <= 160) {
      newChecks.push({
        id: 'meta-desc-length',
        title: 'Meta Description Length (120-160 chars)',
        passed: true,
        score: 10
      });
      currentScore += 10;
    } else {
      newChecks.push({
        id: 'meta-desc-length',
        title: `Meta Description Length (${metaDescription.length} chars) - Aim for 120-160`,
        passed: false,
        score: 0
      });
    }

    // 8. Content Length
    const wordCount = contentText.trim().split(/\s+/).filter(word => word.length > 0).length;
    if (wordCount >= 300) {
      newChecks.push({
        id: 'content-length',
        title: `Content Length (${wordCount} words)`,
        passed: true,
        score: 10
      });
      currentScore += 10;
    } else {
      newChecks.push({
        id: 'content-length',
        title: `Content Length (${wordCount} words) - Aim for at least 300`,
        passed: false,
        score: 0
      });
    }

    // 9. Headings structure (H2, H3)
    if (content.includes('<h2') || content.includes('<h3')) {
      newChecks.push({
        id: 'headings',
        title: 'Contains H2/H3 Headings',
        passed: true,
        score: 10
      });
      currentScore += 10;
    } else {
      newChecks.push({
        id: 'headings',
        title: 'Contains H2/H3 Headings',
        passed: false,
        score: 0
      });
    }

    setScore(currentScore);
    setChecks(newChecks);
    if (onScoreChange) {
      onScoreChange(currentScore);
    }
  }, [title, content, metaTitle, metaDescription, focusKeyword, onScoreChange]);

  let scoreColor = 'text-red-500';
  let bgColor = 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20';
  if (score >= 80) {
    scoreColor = 'text-green-500';
    bgColor = 'bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/20';
  } else if (score >= 50) {
    scoreColor = 'text-amber-500';
    bgColor = 'bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20';
  }

  return (
    <div className="bg-white dark:bg-primary border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden shadow-sm">
      <div className="p-4 border-b border-gray-200 dark:border-white/10 flex justify-between items-center">
        <h3 className="font-semibold flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-500" />
          SEO Content Score
        </h3>
        <div className={`w-12 h-12 rounded-full border-4 flex items-center justify-center font-bold text-lg ${scoreColor} ${
          score >= 80 ? 'border-green-500' : score >= 50 ? 'border-amber-500' : 'border-red-500'
        }`}>
          {score}
        </div>
      </div>
      <div className={`p-4 ${bgColor} transition-colors duration-300`}>
        <div className="space-y-3">
          {checks.map(check => (
            <div key={check.id} className="flex items-start gap-3 text-sm">
              {check.passed ? (
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 text-red-400 shrink-0" />
              )}
              <span className={check.passed ? 'text-gray-700 dark:text-gray-300' : 'text-gray-900 dark:text-white font-medium'}>
                {check.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
