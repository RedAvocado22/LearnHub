package com.learnhub.course.category;

import java.util.List;
import jakarta.validation.Valid;
import com.learnhub.course.category.dto.AddCategoryRequest;
import com.learnhub.course.category.dto.CategoryResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/v1/categories")
@AllArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping
    public ResponseEntity<List<CategoryResponse>> getAll() {
        return ResponseEntity.ok(categoryService.getAllResp());
    }

    @PostMapping
    public ResponseEntity<?> addOne(@Valid @RequestBody AddCategoryRequest req) {
        categoryService.add(req.name());
        return ResponseEntity.ok().build();
    }
}
