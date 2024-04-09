package org.app;

import java.time.LocalDate;

import org.app.Person.domain.Person;
import org.app.Person.repository.PersonRepository;

import io.quarkus.runtime.StartupEvent;
import jakarta.enterprise.event.Observes;
import jakarta.inject.Singleton;
import jakarta.transaction.Transactional;

@Singleton
public class Application {
  private final PersonRepository personRepository = new PersonRepository();

  @Transactional
  void onStart(@Observes StartupEvent event) {
    // Code to seed data into the database
    if (event.getClass().getSimpleName().equals("StartupEvent")) {
      System.out.println("The application is starting... ");

      // Seed data
      Person person1 = new Person();
      person1.setName("John Doe");
      person1.setBirth(LocalDate.of(1980, 1, 1));
      this.personRepository.persist(person1);

      Person person2 = new Person();
      person2.setName("Jane Doe");
      person2.setBirth(LocalDate.of(1985, 2, 2));
      this.personRepository.persist(person2);
    }
  }
}
