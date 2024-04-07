package org.app.resource;

import io.quarkus.test.junit.QuarkusTest;
import io.restassured.http.ContentType;

import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.*;

@QuarkusTest
class PersonResourceTest {
    @Test
    void testPersonsEndpoint() {
        given()
                .when().get("/persons")
                .then()
                .statusCode(200)
                .contentType(ContentType.JSON)
                .body("size()", equalTo(2))
                .body("[0].id", equalTo(1)) // Verify first object id
                .body("[0].name", equalTo("John Doe")) // Verify first object name
                .body("[1].id", equalTo(2)) // Verify second object id
                .body("[1].name", equalTo("Jane Doe")); // Verify second object name
    }

}