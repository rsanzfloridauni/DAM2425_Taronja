package FishAPI.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "avatares")
public class Avatar {
	@Id
	private String id;
	private int id_avatar;
	private String nombre;
	private String foto;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
	
	public int getId_avatar() {
		return id_avatar;
	}

	public void setId_avatar(int id_avatar) {
		this.id_avatar = id_avatar;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getFoto() {
		return foto;
	}

	public void setFoto(String foto) {
		this.foto = foto;
	}
}
