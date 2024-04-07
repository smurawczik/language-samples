package org.acme.resource;

import java.net.URI;
import java.util.List;

import org.acme.domain.Person;
import org.acme.repository.PersonRepository;

import jakarta.transaction.Transactional;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.NotFoundException;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/persons")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class PersonResource {
  PersonRepository personRepository = new PersonRepository();

  @GET
  public List<Person> list() {
    return this.personRepository.listAll();
  }

  @GET
  @Path("/{id}")
  public Person get(Long id) {
    return this.personRepository.findById(id);
  }

  @POST
  @Transactional
  public Response create(Person person) {
    this.personRepository.persist(person);
    return Response.created(URI.create("/persons/" + person.getId())).build();
  }

  @PUT
  @Path("/{id}")
  @Transactional
  public Person update(Long id, Person person) {
    Person entity = this.personRepository.findById(id);
    if (entity == null) {
      throw new NotFoundException();
    }

    // map all fields from the person parameter to the existing entity
    entity.setName(person.getName());
    entity.setBirth(person.getBirth());

    return entity;
  }

  @DELETE
  @Path("/{id}")
  @Transactional
  public void delete(Long id) {
    Person entity = this.personRepository.findById(id);
    if (entity == null) {
      throw new NotFoundException();
    }

    this.personRepository.delete(entity);
  }

  @GET
  @Path("/search/{name}")
  public Person search(String name) {
    return this.personRepository.findByName(name);
  }

  @GET
  @Path("/count")
  public Long count() {
    return this.personRepository.count();
  }
}