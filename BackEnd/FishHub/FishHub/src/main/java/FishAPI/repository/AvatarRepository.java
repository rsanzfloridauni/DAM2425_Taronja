package FishAPI.repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import FishAPI.model.Avatar;
import FishAPI.model.Publicacion;
import FishAPI.model.Usuario;

public interface AvatarRepository extends MongoRepository<Avatar, String> {
	// BÚSQUEDA POR ID
		@Query("{ 'id_avatar': ?0}")
		Optional<Avatar> findByIdAvatar(int id_avatar);
		
	// BÚSQUEDA PARA DEVOLVER LOS AVATARES POR DEFECTO
		@Query("{ 'id_avatar' : { $gte: 0, $lte: 28 } }")
		List<Avatar> findDefaults();
}
