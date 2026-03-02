import { Student, AttendanceRecord, Holiday, Class } from '../types';

export function generateSampleData() {
  // Generate sample students
  const students: Student[] = [];
  const classNames = ['10th', '11th', '12th'];
  const sections = ['A', 'B', 'C'];
  const firstNames = ['Ali', 'Ahmed', 'Fatima', 'Ayesha', 'Hassan', 'Hussain', 'Zainab', 'Maryam', 'Omar', 'Usman'];
  const lastNames = ['Khan', 'Ahmed', 'Raza', 'Shah', 'Malik', 'Baig', 'Sheikh', 'Chaudhry', 'Mirza', 'Qureshi'];

  for (let i = 1; i <= 50; i++) {
    const className = classNames[Math.floor(Math.random() * classNames.length)];
    const section = sections[Math.floor(Math.random() * sections.length)];
    
    students.push({
      id: `student_${i}`,
      name: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${
        lastNames[Math.floor(Math.random() * lastNames.length)]
      }`,
      rollNumber: `R${String(i).padStart(3, '0')}`,
      classId: className,
      class: className,
      section: section,
      email: `student${i}@school.edu`,
      phone: `0300-${String(Math.floor(1000000 + Math.random() * 9000000)).slice(0, 7)}`,
      enrollmentDate: '2024-01-15',
      academicPerformance: Math.floor(60 + Math.random() * 40), // Random score between 60-100
      attendanceRate: Math.floor(70 + Math.random() * 30), // Random attendance rate
      attendance: `${Math.floor(70 + Math.random() * 30)}%`,
      status: 'active' as const,
      riskLevel: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as 'low' | 'medium' | 'high',
      lastSeen: `${Math.floor(Math.random() * 7)} days ago`,
      createdAt: '2024-01-15T00:00:00.000Z',
      updatedAt: new Date().toISOString()
    });
  }

  // Generate sample classes
  const classes: Class[] = [
    { 
      id: 'class_10a', 
      name: '10th', 
      grade: '10',
      section: 'A', 
      academicYear: '2024-2025', 
      totalStudents: 18, 
      currentEnrollment: 18,
      capacity: 25,
      teacherId: 'teacher_1',
      status: 'active' as const,
      schedule: [
        { day: 'Monday', startTime: '08:00', endTime: '09:00', room: 'Room 101' },
        { day: 'Tuesday', startTime: '08:00', endTime: '09:00', room: 'Room 101' },
        { day: 'Wednesday', startTime: '08:00', endTime: '09:00', room: 'Room 101' },
        { day: 'Thursday', startTime: '08:00', endTime: '09:00', room: 'Room 101' },
        { day: 'Friday', startTime: '08:00', endTime: '09:00', room: 'Room 101' }
      ],
      createdAt: '2024-01-15T00:00:00.000Z',
      updatedAt: new Date().toISOString()
    },
    { 
      id: 'class_10b', 
      name: '10th', 
      grade: '10',
      section: 'B', 
      academicYear: '2024-2025', 
      totalStudents: 16, 
      currentEnrollment: 16,
      capacity: 25,
      teacherId: 'teacher_2',
      status: 'active' as const,
      schedule: [
        { day: 'Monday', startTime: '09:00', endTime: '10:00', room: 'Room 102' },
        { day: 'Tuesday', startTime: '09:00', endTime: '10:00', room: 'Room 102' },
        { day: 'Wednesday', startTime: '09:00', endTime: '10:00', room: 'Room 102' },
        { day: 'Thursday', startTime: '09:00', endTime: '10:00', room: 'Room 102' },
        { day: 'Friday', startTime: '09:00', endTime: '10:00', room: 'Room 102' }
      ],
      createdAt: '2024-01-15T00:00:00.000Z',
      updatedAt: new Date().toISOString()
    },
    { 
      id: 'class_11a', 
      name: '11th', 
      grade: '11',
      section: 'A', 
      academicYear: '2024-2025', 
      totalStudents: 20, 
      currentEnrollment: 20,
      capacity: 25,
      teacherId: 'teacher_3',
      status: 'active' as const,
      schedule: [
        { day: 'Monday', startTime: '10:00', endTime: '11:00', room: 'Room 201' },
        { day: 'Tuesday', startTime: '10:00', endTime: '11:00', room: 'Room 201' },
        { day: 'Wednesday', startTime: '10:00', endTime: '11:00', room: 'Room 201' },
        { day: 'Thursday', startTime: '10:00', endTime: '11:00', room: 'Room 201' },
        { day: 'Friday', startTime: '10:00', endTime: '11:00', room: 'Room 201' }
      ],
      createdAt: '2024-01-15T00:00:00.000Z',
      updatedAt: new Date().toISOString()
    },
    { 
      id: 'class_11b', 
      name: '11th', 
      grade: '11',
      section: 'B', 
      academicYear: '2024-2025', 
      totalStudents: 17, 
      currentEnrollment: 17,
      capacity: 25,
      teacherId: 'teacher_4',
      status: 'active' as const,
      schedule: [
        { day: 'Monday', startTime: '11:00', endTime: '12:00', room: 'Room 202' },
        { day: 'Tuesday', startTime: '11:00', endTime: '12:00', room: 'Room 202' },
        { day: 'Wednesday', startTime: '11:00', endTime: '12:00', room: 'Room 202' },
        { day: 'Thursday', startTime: '11:00', endTime: '12:00', room: 'Room 202' },
        { day: 'Friday', startTime: '11:00', endTime: '12:00', room: 'Room 202' }
      ],
      createdAt: '2024-01-15T00:00:00.000Z',
      updatedAt: new Date().toISOString()
    },
    { 
      id: 'class_12a', 
      name: '12th', 
      grade: '12',
      section: 'A', 
      academicYear: '2024-2025', 
      totalStudents: 22, 
      currentEnrollment: 22,
      capacity: 30,
      teacherId: 'teacher_5',
      status: 'active' as const,
      schedule: [
        { day: 'Monday', startTime: '12:00', endTime: '13:00', room: 'Room 301' },
        { day: 'Tuesday', startTime: '12:00', endTime: '13:00', room: 'Room 301' },
        { day: 'Wednesday', startTime: '12:00', endTime: '13:00', room: 'Room 301' },
        { day: 'Thursday', startTime: '12:00', endTime: '13:00', room: 'Room 301' },
        { day: 'Friday', startTime: '12:00', endTime: '13:00', room: 'Room 301' }
      ],
      createdAt: '2024-01-15T00:00:00.000Z',
      updatedAt: new Date().toISOString()
    },
    { 
      id: 'class_12b', 
      name: '12th', 
      grade: '12',
      section: 'B', 
      academicYear: '2024-2025', 
      totalStudents: 19, 
      currentEnrollment: 19,
      capacity: 30,
      teacherId: 'teacher_6',
      status: 'active' as const,
      schedule: [
        { day: 'Monday', startTime: '13:00', endTime: '14:00', room: 'Room 302' },
        { day: 'Tuesday', startTime: '13:00', endTime: '14:00', room: 'Room 302' },
        { day: 'Wednesday', startTime: '13:00', endTime: '14:00', room: 'Room 302' },
        { day: 'Thursday', startTime: '13:00', endTime: '14:00', room: 'Room 302' },
        { day: 'Friday', startTime: '13:00', endTime: '14:00', room: 'Room 302' }
      ],
      createdAt: '2024-01-15T00:00:00.000Z',
      updatedAt: new Date().toISOString()
    }
  ];

  // Generate sample holidays
  const holidays: Holiday[] = [
    {
      id: 'holiday_1',
      date: '2024-03-23',
      name: 'Pakistan Day',
      description: 'National holiday commemorating the Lahore Resolution',
      type: 'national',
      recurring: true,
    },
    {
      id: 'holiday_2',
      date: '2024-05-01',
      name: 'Labour Day',
      description: 'International Workers Day',
      type: 'national',
      recurring: true,
    },
    {
      id: 'holiday_3',
      date: '2024-06-16',
      name: 'Eid-ul-Fitr',
      description: 'Religious holiday',
      type: 'national',
      recurring: false,
    },
    {
      id: 'holiday_4',
      date: '2024-08-14',
      name: 'Independence Day',
      description: 'Pakistan Independence Day',
      type: 'national',
      recurring: true,
    },
  ];

  // Generate sample attendance records for last 30 days
  const attendanceRecords: AttendanceRecord[] = [];
  const today = new Date();

  for (let day = 0; day < 30; day++) {
    const date = new Date(today);
    date.setDate(today.getDate() - day);
    const dateString = date.toISOString().split('T')[0];

    // Skip if it's a holiday
    const isHoliday = holidays.some(h => h.date === dateString);
    if (isHoliday) continue;

    // For each student, generate attendance
    students.forEach((student, index) => {
      // Ensure 85% attendance rate on average
      const isPresent = Math.random() < 0.85;
      let status: 'Present' | 'Absent' | 'Late' = isPresent ? 'Present' : 'Absent';
      
      // Some present students are late
      if (status === 'Present' && Math.random() < 0.15) {
        status = 'Late';
      }

      // Some students have patterns (consistently late or absent)
      if (index < 5 && day < 20) { // First 5 students have poor attendance
        if (Math.random() < 0.4) status = 'Absent';
        else if (Math.random() < 0.3) status = 'Late';
      }

      attendanceRecords.push({
        id: `att_${student.id}_${dateString}`,
        studentId: student.id,
        classId: student.classId,
        date: dateString,
        status: status.toLowerCase() as 'present' | 'absent' | 'late' | 'excused' | 'holiday',
        timestamp: new Date(date.setHours(8 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 60))).toISOString(),
        markedBy: 'teacher_1',
        checkInTime: status === 'Present' || status === 'Late' ? new Date(date.setHours(8 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 60))).toISOString() : undefined,
        checkOutTime: status === 'Present' || status === 'Late' ? new Date(date.setHours(15 + Math.floor(Math.random() * 2), Math.floor(Math.random() * 60))).toISOString() : undefined,
        lateMinutes: status === 'Late' ? Math.floor(5 + Math.random() * 55) : undefined,
        remarks: status === 'Late' ? 'Late arrival' : undefined,
        createdAt: new Date(date).toISOString(),
        updatedAt: new Date(date).toISOString()
      });
    });
  }

  return {
    students,
    attendanceRecords,
    holidays,
    classes,
  };
}
