import React from 'react';

// Performance monitoring utilities
export class PerformanceMonitor {
  private static metrics: Map<string, number[]> = new Map();
  
  static startTiming(name: string): () => void {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      if (!this.metrics.has(name)) {
        this.metrics.set(name, []);
      }
      
      this.metrics.get(name)!.push(duration);
      
      // Keep only last 10 measurements
      const measurements = this.metrics.get(name)!;
      if (measurements.length > 10) {
        measurements.shift();
      }
    };
  }
  
  static getAverageTime(name: string): number {
    const measurements = this.metrics.get(name) || [];
    if (measurements.length === 0) return 0;
    
    return measurements.reduce((sum, time) => sum + time, 0) / measurements.length;
  }
  
  static getAllMetrics(): Record<string, { avg: number; min: number; max: number }> {
    const result: Record<string, { avg: number; min: number; max: number }> = {};
    
    this.metrics.forEach((measurements, name) => {
      if (measurements.length === 0) return;
      
      const avg = measurements.reduce((sum, time) => sum + time, 0) / measurements.length;
      const min = Math.min(...measurements);
      const max = Math.max(...measurements);
      
      result[name] = { avg, min, max };
    });
    
    return result;
  }
  
  static clearMetrics(): void {
    this.metrics.clear();
  }
}

// Performance hook for React components
export const usePerformanceMonitor = (componentName: string) => {
  React.useEffect(() => {
    const endTiming = PerformanceMonitor.startTiming(`${componentName}_render`);
    
    return endTiming;
  });
};
