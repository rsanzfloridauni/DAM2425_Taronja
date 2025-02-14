package FishAPI.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import FishAPI.model.Familia;

public interface FamiliaRepository extends MongoRepository<Familia, String> {
	// BÚSQUEDA POR ID
	@Query("{ 'id_familia': ?0}")
	Optional<Familia> findById(int id_familia);
}
