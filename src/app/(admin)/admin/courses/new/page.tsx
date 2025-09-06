import { CreateCourseForm } from '@/components/admin/create-course-form';

export default function NewCoursePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Create New Course</h1>
        <p className="text-gray-600">Add a new course to your platform</p>
      </div>
      <CreateCourseForm />
    </div>
  )
}
