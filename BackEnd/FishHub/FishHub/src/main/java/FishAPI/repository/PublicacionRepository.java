package FishAPI.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import FishAPI.model.Publicacion;

public interface PublicacionRepository extends MongoRepository<Publicacion, String> {
	// BÚSQUEDA POR ID DE USUARIO
	@Query("{ 'id_Usuario': ?0}")
	List<Publicacion> findByIdUsuario(int id_Usuario);

	// BÚSQUEDA POR ID DE USUARIO Y FECHAS
	@Query("{ 'fecha' : { $gte: ?0, $lte: ?1 }, 'id_Usuario' : ?2 }")
    List<Publicacion> findByFechaBetweenAndIdUsuario(Date fechaInicio, Date fechaFin, int id_Usuario);

	// BÚSQUEDA POR FECHA
    @Query("{ 'fecha' : { $gte: ?0, $lte: ?1 } }")
    List<Publicacion> findByFechaBetween(Date fechaInicio, Date fechaFin);

    // TODOS EN UNA LISTA
    List<Publicacion> findAll();

}
