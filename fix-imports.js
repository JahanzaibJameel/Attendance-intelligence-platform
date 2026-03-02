const fs = require('fs');
const path = require('path');

// Files to fix imports in
const filesToFix = [
  'src/components/analytics/RiskAlerts.tsx',
  'src/components/analytics/LateComerTracking.tsx',
  'src/components/analytics/PerformanceCorrelation.tsx',
  'src/components/attendance/AttendanceTable.tsx',
  'src/components/attendance/LateComerTracking.tsx',
  'src/components/common/DatePicker.tsx',
  'src/components/common/StatCard.tsx',
  'src/components/reports/ReportGenerator.tsx',
  'src/components/setup/ClassManager.tsx',
  'src/components/setup/HolidayManager.tsx',
  'src/components/setup/StudentManager.tsx',
  'src/context/AttendanceContext.tsx',
  'src/hooks/useAnalytics.ts',
  'src/hooks/useAttendance.ts',
  'src/services/calculations.ts',
  'src/services/reports.ts',
  'src/services/storage.ts',
  'src/utils/dateUtils.ts',
  'src/utils/sampleData.ts'
];

filesToFix.forEach(filePath => {
  const fullPath = path.join(__dirname, filePath);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Replace type imports with import type
    content = content.replace(
      /import\s*{([^}]+)}\s*from\s*['"][^'"]+['"]/g,
      (match, imports) => {
        const typeImports = ['Student', 'AttendanceRecord', 'Holiday', 'Class', 
                           'LateComerStats', 'RiskStudent', 'AttendanceStatus',
                           'ReportConfig', 'LucideIcon', 'AnalyticsData'];
        
        let newImports = imports;
        typeImports.forEach(typeName => {
          if (imports.includes(typeName)) {
            newImports = newImports.replace(typeName, `type ${typeName}`);
          }
        });
        
        return match.replace(imports, newImports);
      }
    );
    
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Fixed imports in ${filePath}`);
  }
});