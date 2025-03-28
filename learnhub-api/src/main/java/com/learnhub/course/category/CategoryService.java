package com.learnhub.course.category;

import java.util.List;
import com.learnhub.course.Course;
import com.learnhub.course.CourseRepository;
import com.learnhub.course.category.dto.CategoryResponse;
import org.springframework.stereotype.Service;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final CourseRepository courseRepository;
    
    public List<Category> getAll() {
        return categoryRepository.findAll();
    }

    public List<CategoryResponse> getAllResp() {
        List<Course> courses = courseRepository.findAll();
        return categoryRepository.findAll().stream()
            .map(
                cat -> new CategoryResponse(
                    cat.getId(),
                    cat.getName(),
                    courses.stream().filter(course -> course.getCategory().getId() == cat.getId()).count()))
            .toList();
    }

    public void add(String name) {
        categoryRepository.save(Category.builder().name(name).build());
    }
}
