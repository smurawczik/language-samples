package org.app.repository;

import io.quarkus.hibernate.orm.panache.PanacheRepository;

import jakarta.enterprise.context.ApplicationScoped;
import java.util.List;

import org.app.domain.Person;

@ApplicationScoped
public class PersonRepository implements PanacheRepository<Person> {

  // put your custom logic here as instance methods

  public Person findByName(String name) {
    return find("name", name).firstResult();
  }

  public List<Person> findAlive() {
    return list("");
  }

  public void deleteStefs() {
    delete("name", "Stef");
  }
}