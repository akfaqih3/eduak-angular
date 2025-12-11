import { ListResponse, PaginatedResponse, SingleResponse } from '../../core';
import { CourseEntity } from '../../domain/entities/course.entity';

export interface CourseModel {
  id: number;
  owner?: string;
  title: string;
  subject: string;
  overview: string;
  photo?: string;
  total_students?: number;
  total_modules?: number;
  created?: string;
}


export interface CoursesApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: CourseModel[];
}

export class CourseMapper {

  static toDomain(model: CourseModel): CourseEntity {
    return {
      id: model.id,
      overview: model.overview,
      photo: model.photo,
      subject: model.subject,
      title: model.title,
    };
  }

  static toModel(entity: CourseEntity): CourseModel {
    return {
      id: entity.id,
      overview: entity.overview,
      photo: entity.photo,
      subject: entity.subject,
      title: entity.title,
    };
  }
  /**
   * تحويل استجابة قائمة الكورسات إلى ListResponse
   */
  static toListResponse(apiResponse: CoursesApiResponse): ListResponse<CourseModel> {
    return {
      data: apiResponse.results,
      count: apiResponse.count,
      success: true,
      message: 'Courses retrieved successfully'
    };
  }

  /**
   * تحويل استجابة قائمة الكورسات إلى PaginatedResponse
   */
  static toPaginatedResponse(
    apiResponse: CoursesApiResponse,
    currentPage: number = 1,
    pageSize: number = 10
  ): PaginatedResponse<CourseModel> {
    const totalPages = Math.ceil(apiResponse.count / pageSize);

    return {
      data: apiResponse.results,
      success: true,
      message: 'Courses retrieved successfully',
      pagination: {
        currentPage,
        totalPages,
        pageSize,
        totalItems: apiResponse.count,
        hasNext: apiResponse.next !== null,
        hasPrevious: apiResponse.previous !== null
      }
    };
  }

  /**
   * تحويل استجابة كورس واحد إلى SingleResponse
   */
  static toSingleResponse(apiResponse: CourseModel): SingleResponse<CourseModel> {
    return {
      data: apiResponse,
      success: true,
      message: 'Course retrieved successfully'
    };
  }

}