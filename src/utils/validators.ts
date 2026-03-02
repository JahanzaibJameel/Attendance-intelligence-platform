/**
 * Validation utilities for attendance system
 */
import { AttendanceRecord, Class, Holiday, Student } from '../types';

// Email validation
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Phone number validation (Pakistan format)
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^03\d{2}-\d{7}$/;
  return phoneRegex.test(phone);
}

// Date validation
export function isValidDate(dateString: string): boolean {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;
  
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime()) && dateString === date.toISOString().split('T')[0];
}

// Future date validation
export function isFutureDate(dateString: string): boolean {
  if (!isValidDate(dateString)) return false;
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date > today;
}

// Past date validation
export function isPastDate(dateString: string): boolean {
  if (!isValidDate(dateString)) return false;
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
}

// Date range validation
export function isValidDateRange(startDate: string, endDate: string): boolean {
  if (!isValidDate(startDate) || !isValidDate(endDate)) return false;
  return new Date(startDate) <= new Date(endDate);
}

// Student ID validation
export function isValidStudentId(id: string): boolean {
  return id.startsWith('student_') && id.length > 10;
}

// Roll number validation
export function isValidRollNumber(rollNumber: string): boolean {
  const rollNumberRegex = /^[A-Z]?\d{3,6}$/;
  return rollNumberRegex.test(rollNumber);
}

// Class name validation
export function isValidClassName(className: string): boolean {
  const classNameRegex = /^(\d{1,2}(th|TH)|[A-Za-z]+)$/;
  return classNameRegex.test(className);
}

// Section validation
export function isValidSection(section: string): boolean {
  const sectionRegex = /^[A-Z]$/;
  return sectionRegex.test(section);
}

// Academic year validation
export function isValidAcademicYear(year: string): boolean {
  const yearRegex = /^\d{4}-\d{4}$/;
  if (!yearRegex.test(year)) return false;
  
  const [start, end] = year.split('-').map(Number);
  return end === start + 1;
}

// Percentage validation
export function isValidPercentage(percentage: number): boolean {
  return percentage >= 0 && percentage <= 100;
}

// Attendance status validation
export function isValidAttendanceStatus(status: string): boolean {
  const validStatuses = ['Present', 'Absent', 'Late', 'Holiday'];
  return validStatuses.includes(status);
}

// Late minutes validation
export function isValidLateMinutes(minutes: number): boolean {
  return minutes >= 1 && minutes <= 180; // 1 minute to 3 hours
}

// Number of students validation
export function isValidStudentCount(count: number): boolean {
  return count >= 1 && count <= 100;
}

// Holiday type validation
export function isValidHolidayType(type: string): boolean {
  const validTypes = ['national', 'academic', 'regional'];
  return validTypes.includes(type);
}

// File validation for import
export function isValidImportFile(file: File): boolean {
  const validTypes = ['application/json', 'text/json'];
  const maxSize = 10 * 1024 * 1024; // 10MB
  
  return validTypes.includes(file.type) && file.size <= maxSize;
}

// JSON data validation for import
type ImportData = {
  students: Array<Partial<Student>>;
  attendanceRecords: Array<Partial<AttendanceRecord>>;
  holidays: Array<Partial<Holiday>>;
  classes: Array<Partial<Class>>;
};

export function isValidImportData(data: unknown): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!data || typeof data !== 'object') {
    errors.push('No data provided');
    return { isValid: false, errors };
  }

  const typedData = data as Partial<ImportData>;
  
  // Check for required top-level arrays
  const requiredArrays = ['students', 'attendanceRecords', 'holidays', 'classes'];
  requiredArrays.forEach(arrayName => {
    if (!Array.isArray((typedData as Record<string, unknown>)[arrayName])) {
      errors.push(`Missing or invalid ${arrayName} array`);
    }
  });
  
  // Validate students
  if (Array.isArray(typedData.students)) {
    typedData.students.forEach((student, index) => {
      if (!student.id || !student.name || !student.rollNumber || !student.class) {
        errors.push(`Student ${index + 1} missing required fields`);
      }
      
      if (student.id && !isValidStudentId(student.id)) {
        errors.push(`Student ${index + 1} has invalid ID format`);
      }
      
      if (student.rollNumber && !isValidRollNumber(student.rollNumber)) {
        errors.push(`Student ${index + 1} has invalid roll number`);
      }
      
      if (student.class && !isValidClassName(student.class)) {
        errors.push(`Student ${index + 1} has invalid class name`);
      }
    });
  }
  
  // Validate attendance records
  if (Array.isArray(typedData.attendanceRecords)) {
    typedData.attendanceRecords.forEach((record, index) => {
      if (!record.id || !record.studentId || !record.date || !record.status) {
        errors.push(`Attendance record ${index + 1} missing required fields`);
      }
      
      if (record.date && !isValidDate(record.date)) {
        errors.push(`Attendance record ${index + 1} has invalid date`);
      }
      
      if (record.status && !isValidAttendanceStatus(record.status)) {
        errors.push(`Attendance record ${index + 1} has invalid status`);
      }
      
      if (record.lateMinutes && !isValidLateMinutes(record.lateMinutes)) {
        errors.push(`Attendance record ${index + 1} has invalid late minutes`);
      }
    });
  }
  
  // Validate holidays
  if (Array.isArray(typedData.holidays)) {
    typedData.holidays.forEach((holiday, index) => {
      if (!holiday.id || !holiday.date || !holiday.name) {
        errors.push(`Holiday ${index + 1} missing required fields`);
      }
      
      if (holiday.date && !isValidDate(holiday.date)) {
        errors.push(`Holiday ${index + 1} has invalid date`);
      }
      
      if (holiday.type && !isValidHolidayType(holiday.type)) {
        errors.push(`Holiday ${index + 1} has invalid type`);
      }
    });
  }
  
  // Validate classes
  if (Array.isArray(typedData.classes)) {
    typedData.classes.forEach((cls, index) => {
      if (!cls.id || !cls.name || !cls.academicYear) {
        errors.push(`Class ${index + 1} missing required fields`);
      }
      
      if (cls.academicYear && !isValidAcademicYear(cls.academicYear)) {
        errors.push(`Class ${index + 1} has invalid academic year`);
      }
      
      if (cls.totalStudents && !isValidStudentCount(cls.totalStudents)) {
        errors.push(`Class ${index + 1} has invalid student count`);
      }
    });
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Validate attendance entry
export function validateAttendanceEntry(entry: {
  studentId: string;
  date: string;
  status: string;
  lateMinutes?: number;
}): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!entry.studentId) {
    errors.push('Student ID is required');
  }
  
  if (!entry.date) {
    errors.push('Date is required');
  } else if (!isValidDate(entry.date)) {
    errors.push('Invalid date format');
  }
  
  if (!entry.status) {
    errors.push('Status is required');
  } else if (!isValidAttendanceStatus(entry.status)) {
    errors.push('Invalid attendance status');
  }
  
  if (entry.status === 'Late' && (!entry.lateMinutes || !isValidLateMinutes(entry.lateMinutes))) {
    errors.push('Valid late minutes required for late status');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Validate student form
export function validateStudentForm(formData: {
  name: string;
  rollNumber: string;
  class: string;
  section: string;
  email?: string;
  phone?: string;
}): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!formData.name || formData.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters');
  }
  
  if (!formData.rollNumber || !isValidRollNumber(formData.rollNumber)) {
    errors.push('Valid roll number is required');
  }
  
  if (!formData.class || !isValidClassName(formData.class)) {
    errors.push('Valid class name is required');
  }
  
  if (!formData.section || !isValidSection(formData.section)) {
    errors.push('Valid section is required (A-Z)');
  }
  
  if (formData.email && !isValidEmail(formData.email)) {
    errors.push('Invalid email address');
  }
  
  if (formData.phone && !isValidPhone(formData.phone)) {
    errors.push('Invalid phone number format (03XX-XXXXXXX)');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Validate class form
export function validateClassForm(formData: {
  name: string;
  section: string;
  academicYear: string;
  totalStudents: number;
}): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!formData.name || !isValidClassName(formData.name)) {
    errors.push('Valid class name is required');
  }
  
  if (!formData.section || !isValidSection(formData.section)) {
    errors.push('Valid section is required (A-Z)');
  }
  
  if (!formData.academicYear || !isValidAcademicYear(formData.academicYear)) {
    errors.push('Valid academic year is required (YYYY-YYYY)');
  }
  
  if (!formData.totalStudents || !isValidStudentCount(formData.totalStudents)) {
    errors.push('Valid student count is required (1-100)');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Validate holiday form
export function validateHolidayForm(formData: {
  name: string;
  date: string;
  type: string;
}): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!formData.name || formData.name.trim().length < 2) {
    errors.push('Holiday name is required');
  }
  
  if (!formData.date || !isValidDate(formData.date)) {
    errors.push('Valid date is required');
  }
  
  if (!formData.type || !isValidHolidayType(formData.type)) {
    errors.push('Valid holiday type is required');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Sanitize input (prevent XSS)
export function sanitizeInput(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// Format validation error messages
export function formatValidationErrors(errors: string[]): string {
  return errors.join('\n');
}

// Check if date is within academic year
export function isWithinAcademicYear(date: string, academicYear: string): boolean {
  if (!isValidDate(date) || !isValidAcademicYear(academicYear)) {
    return false;
  }
  
  const [startYear] = academicYear.split('-').map(Number);
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  
  return year === startYear || year === startYear + 1;
}
