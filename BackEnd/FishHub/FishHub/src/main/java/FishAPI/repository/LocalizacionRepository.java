package FishAPI.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import FishAPI.model.Localizacion;

public interface LocalizacionRepository extends MongoRepository<Localizacion, String> {
	// BÚSQUEDA POR ID
    @Query("{ 'id_localizacion': ?0 }")
    Optional<Localizacion> findById(int id_localizacion);
}

