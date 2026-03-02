import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Student, AttendanceRecord, Class, Holiday } from '../types';

export interface AttendanceState {
  // Data
  students: Student[];
  attendanceRecords: AttendanceRecord[];
  classes: Class[];
  holidays: Holiday[];
  
  // UI State
  selectedClass: string | null;
  selectedDate: string;
  loading: boolean;
  error: string | null;
  
  // Actions
  setStudents: (students: Student[]) => void;
  addStudent: (student: Student) => void;
  updateStudent: (id: string, updates: Partial<Student>) => void;
  deleteStudent: (id: string) => void;
  
  setAttendanceRecords: (records: AttendanceRecord[]) => void;
  addAttendanceRecord: (record: AttendanceRecord) => void;
  updateAttendanceRecord: (id: string, updates: Partial<AttendanceRecord>) => void;
  deleteAttendanceRecord: (id: string) => void;
  
  setClasses: (classes: Class[]) => void;
  addClass: (classData: Class) => void;
  updateClass: (id: string, updates: Partial<Class>) => void;
  deleteClass: (id: string) => void;
  
  setHolidays: (holidays: Holiday[]) => void;
  addHoliday: (holiday: Holiday) => void;
  updateHoliday: (id: string, updates: Partial<Holiday>) => void;
  deleteHoliday: (id: string) => void;
  
  setSelectedClass: (classId: string | null) => void;
  setSelectedDate: (date: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Computed
  getStudentsByClass: (classId: string) => Student[];
  getAttendanceByDate: (date: string) => AttendanceRecord[];
  getAttendanceByStudent: (studentId: string) => AttendanceRecord[];
  getAttendancePercentage: (studentId: string, startDate?: string, endDate?: string) => number;
}

export const useAttendanceStore = create<AttendanceState>()(
  persist(
    (set, get) => ({
      // Initial state
      students: [],
      attendanceRecords: [],
      classes: [],
      holidays: [],
      selectedClass: null,
      selectedDate: new Date().toISOString().split('T')[0],
      loading: false,
      error: null,

      // Student actions
      setStudents: (students) => set({ students }),
      
      addStudent: (student) =>
        set((state) => ({
          students: [...state.students, student],
        })),
      
      updateStudent: (id, updates) =>
        set((state) => ({
          students: state.students.map((student) =>
            student.id === id ? { ...student, ...updates } : student
          ),
        })),
      
      deleteStudent: (id) =>
        set((state) => ({
          students: state.students.filter((student) => student.id !== id),
          attendanceRecords: state.attendanceRecords.filter(
            (record) => record.studentId !== id
          ),
        })),

      // Attendance actions
      setAttendanceRecords: (attendanceRecords) => set({ attendanceRecords }),
      
      addAttendanceRecord: (record) =>
        set((state) => {
          const existingIndex = state.attendanceRecords.findIndex(
            (r) => r.studentId === record.studentId && r.date === record.date
          );
          
          if (existingIndex >= 0) {
            const updatedRecords = [...state.attendanceRecords];
            updatedRecords[existingIndex] = record;
            return { attendanceRecords: updatedRecords };
          }
          
          return {
            attendanceRecords: [...state.attendanceRecords, record],
          };
        }),
      
      updateAttendanceRecord: (id, updates) =>
        set((state) => ({
          attendanceRecords: state.attendanceRecords.map((record) =>
            record.id === id ? { ...record, ...updates } : record
          ),
        })),
      
      deleteAttendanceRecord: (id) =>
        set((state) => ({
          attendanceRecords: state.attendanceRecords.filter(
            (record) => record.id !== id
          ),
        })),

      // Class actions
      setClasses: (classes) => set({ classes }),
      
      addClass: (classData) =>
        set((state) => ({
          classes: [...state.classes, classData],
        })),
      
      updateClass: (id, updates) =>
        set((state) => ({
          classes: state.classes.map((classItem) =>
            classItem.id === id ? { ...classItem, ...updates } : classItem
          ),
        })),
      
      deleteClass: (id) =>
        set((state) => ({
          classes: state.classes.filter((classItem) => classItem.id !== id),
        })),

      // Holiday actions
      setHolidays: (holidays) => set({ holidays }),
      
      addHoliday: (holiday) =>
        set((state) => ({
          holidays: [...state.holidays, holiday],
        })),
      
      updateHoliday: (id, updates) =>
        set((state) => ({
          holidays: state.holidays.map((holiday) =>
            holiday.id === id ? { ...holiday, ...updates } : holiday
          ),
        })),
      
      deleteHoliday: (id) =>
        set((state) => ({
          holidays: state.holidays.filter((holiday) => holiday.id !== id),
        })),

      // UI actions
      setSelectedClass: (classId) => set({ selectedClass: classId }),
      setSelectedDate: (date) => set({ selectedDate: date }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),

      // Computed methods
      getStudentsByClass: (classId) => {
        const state = get();
        return state.students.filter((student) => student.class === classId);
      },
      
      getAttendanceByDate: (date) => {
        const state = get();
        return state.attendanceRecords.filter((record) => record.date === date);
      },
      
      getAttendanceByStudent: (studentId) => {
        const state = get();
        return state.attendanceRecords.filter(
          (record) => record.studentId === studentId
        );
      },
      
      getAttendancePercentage: (studentId, startDate, endDate) => {
        const state = get();
        const studentRecords = state.attendanceRecords.filter(
          (record) => record.studentId === studentId
        );
        
        let filteredRecords = studentRecords;
        
        if (startDate) {
          filteredRecords = filteredRecords.filter(
            (record) => record.date >= startDate
          );
        }
        
        if (endDate) {
          filteredRecords = filteredRecords.filter(
            (record) => record.date <= endDate
          );
        }
        
        if (filteredRecords.length === 0) return 0;
        
        const presentCount = filteredRecords.filter(
          (record) => record.status === 'Present' || record.status === 'Late'
        ).length;
        
        return Math.round((presentCount / filteredRecords.length) * 100);
      },
    }),
    {
      name: 'attendance-store',
    }
  )
);
