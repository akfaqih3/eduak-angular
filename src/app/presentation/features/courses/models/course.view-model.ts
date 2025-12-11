import { CourseEntity } from '../../../../domain/entities/course.entity';

/**
 * ViewModel for displaying course information in the UI
 */
export interface CourseViewModel {
  id: number;
  title: string;
  overview: string;
  subject: string;
  photoUrl: string;
  displaySubject: string;
}

/**
 * Mapper function to convert CourseEntity to CourseViewModel
 */
export function toCourseViewModel(entity: CourseEntity): CourseViewModel {
  return {
    id: entity.id,
    title: entity.title,
    overview: entity.overview,
    subject: entity.subject,
    photoUrl: entity.photo || '/assets/images/default-course.png',
    displaySubject: formatSubjectName(entity.subject),
  };
}

/**
 * Helper function to format subject name for display
 */
function formatSubjectName(subject: string): string {
  // Add any subject name formatting logic here
  return subject.charAt(0).toUpperCase() + subject.slice(1);
}
