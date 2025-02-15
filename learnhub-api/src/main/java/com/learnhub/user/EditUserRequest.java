package com.learnhub.user;

import java.time.LocalDateTime;

public record EditUserRequest(String firstName, String lastName,
                              String phoneNo,
                              String address, String city) {
}
