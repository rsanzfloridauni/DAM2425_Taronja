package FishAPI.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import FishAPI.model.AnimalMarino;

public interface AnimalMarinoRepository extends MongoRepository<AnimalMarino, String> {
	// BÚSQUEDA POR ID
	@Query("{ 'id_animalMarino': ?0}")
	Optional<AnimalMarino> findById(int Id);
}
