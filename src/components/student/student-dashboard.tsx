import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { BookOpen, PlayCircle, ClipboardCheck, Trophy } from 'lucide-react';
import Link from 'next/link';

// Mock data - this will be replaced with actual data from Supabase
const mockEnrolledCourses = [
  {
    id: 1,
    title: 'Advanced Mathematics',
    teacher_name: 'Dr. Sarah Johnson',
    progress: 65,
    total_lessons: 12,
    completed_lessons: 8,
    image_url: '/images/math-course.jpg',
  },
  {
    id: 2,
    title: 'Physics 101',
    teacher_name: 'Prof. Michael Brown',
    progress: 30,
    total_lessons: 8,
    completed_lessons: 2,
    image_url: '/images/physics-course.jpg',
  },
];

const mockRecentActivity = [
  {
    id: 1,
    type: 'lesson',
    title: 'Completed: Linear Algebra Basics',
    course: 'Advanced Mathematics',
    timestamp: '2 hours ago',
  },
  {
    id: 2,
    type: 'exam',
    title: 'Scored 85% on: Calculus Quiz',
    course: 'Advanced Mathematics',
    timestamp: '1 day ago',
  },
  {
    id: 3,
    type: 'lesson',
    title: "Started: Newton's Laws",
    course: 'Physics 101',
    timestamp: '3 days ago',
  },
];

export function StudentDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, Student!
        </h1>
        <p className="text-gray-600">Continue your learning journey</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Enrolled Courses
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockEnrolledCourses.length}
            </div>
            <p className="text-xs text-muted-foreground">Active enrollments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Lessons Completed
            </CardTitle>
            <PlayCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockEnrolledCourses.reduce(
                (acc, course) => acc + course.completed_lessons,
                0
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Total lessons finished
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Exams Taken</CardTitle>
            <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">Average score: 82%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Achievements</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Certificates earned</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>My Courses</CardTitle>
            <CardDescription>Continue where you left off</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockEnrolledCourses.map((course) => (
              <div key={course.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{course.title}</h4>
                    <p className="text-sm text-gray-600">
                      by {course.teacher_name}
                    </p>
                  </div>
                  <span className="text-sm text-gray-500">
                    {course.completed_lessons}/{course.total_lessons} lessons
                  </span>
                </div>
                <div className="space-y-2">
                  <Progress value={course.progress} className="h-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      {course.progress}% complete
                    </span>
                    <Link href={`/student/course/${course.id}`}>
                      <Button size="sm" className="cursor-pointer">
                        Continue
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}

            <div className="pt-4">
              <Link href="/student/courses">
                <Button variant="outline" className="w-full cursor-pointer">
                  View All Courses
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest learning activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockRecentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      activity.type === 'lesson'
                        ? 'bg-blue-100'
                        : 'bg-green-100'
                    }`}
                  >
                    {activity.type === 'lesson' ? (
                      <PlayCircle
                        className={`h-4 w-4 ${
                          activity.type === 'lesson'
                            ? 'text-blue-600'
                            : 'text-green-600'
                        }`}
                      />
                    ) : (
                      <ClipboardCheck className="h-4 w-4 text-green-600" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-gray-600">{activity.course}</p>
                    <p className="text-xs text-gray-500">
                      {activity.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
