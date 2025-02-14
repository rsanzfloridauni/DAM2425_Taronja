package FishAPI.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import FishAPI.model.TipoDeAgua;
public interface TipoDeAguaRepository extends MongoRepository<TipoDeAgua, String> {
	// BÚSQUEDA POR ID
    @Query("{ 'id_tipoDeAgua': ?0 }")
    Optional<TipoDeAgua> findById(int id_tipoDeAgua);
}

