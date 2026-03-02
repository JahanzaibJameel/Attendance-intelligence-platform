import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Users, Calendar, TrendingUp, Plus, Search } from 'lucide-react';

const ClassesPage: React.FC = () => {
  const mockClasses = [
    {
      id: 1,
      name: '10A',
      teacher: 'Mrs. Sarah Johnson',
      students: 32,
      attendance: '94%',
      performance: 'A',
      room: 'Room 101',
      schedule: 'Mon-Fri 8:00 AM',
    },
    {
      id: 2,
      name: '10B',
      teacher: 'Mr. Michael Brown',
      students: 30,
      attendance: '88%',
      performance: 'B+',
      room: 'Room 102',
      schedule: 'Mon-Fri 9:00 AM',
    },
    {
      id: 3,
      name: '11A',
      teacher: 'Mrs. Emily Davis',
      students: 28,
      attendance: '96%',
      performance: 'A-',
      room: 'Room 201',
      schedule: 'Mon-Fri 10:00 AM',
    },
    {
      id: 4,
      name: '11B',
      teacher: 'Mr. James Wilson',
      students: 31,
      attendance: '91%',
      performance: 'B',
      room: 'Room 202',
      schedule: 'Mon-Fri 11:00 AM',
    },
  ];

  const getPerformanceColor = (performance: string) => {
    const colors: Record<string, string> = {
      'A': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      'A-': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      'B+': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      'B': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      'B-': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
      'C+': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
    };
    return colors[performance] || colors.B;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Classes
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Manage and monitor all class activities and performance.
          </p>
        </div>
        <button className="px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Class</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Total Classes', value: '48', change: '+4 this semester' },
          { title: 'Active Today', value: '46', change: '2 classes on leave' },
          { title: 'Avg Attendance', value: '92.3%', change: '+2.1% from last week' },
          { title: 'Total Students', value: '1,248', change: '+45 new enrollments' },
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700"
          >
            <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">
              {stat.title}
            </h3>
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-1">
              {stat.value}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {stat.change}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search classes..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <div className="flex items-center space-x-2">
          <select className="px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg">
            <option>All Teachers</option>
            <option>Mrs. Johnson</option>
            <option>Mr. Brown</option>
            <option>Mrs. Davis</option>
          </select>
        </div>
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockClasses.map((classItem, index) => (
          <motion.div
            key={classItem.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Class Header */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPerformanceColor(classItem.performance)}`}>
                  {classItem.performance}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Class {classItem.name}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                {classItem.teacher}
              </p>
            </div>

            {/* Class Details */}
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-600 dark:text-slate-400">Students</span>
                </div>
                <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  {classItem.students}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-600 dark:text-slate-400">Attendance</span>
                </div>
                <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  {classItem.attendance}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-600 dark:text-slate-400">Schedule</span>
                </div>
                <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  {classItem.schedule}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">Room</span>
                <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  {classItem.room}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="p-6 border-t border-slate-200 dark:border-slate-700">
              <div className="flex items-center space-x-3">
                <button className="flex-1 px-4 py-2 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors">
                  View Details
                </button>
                <button className="px-4 py-2 bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors">
                  Mark Attendance
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ClassesPage;
