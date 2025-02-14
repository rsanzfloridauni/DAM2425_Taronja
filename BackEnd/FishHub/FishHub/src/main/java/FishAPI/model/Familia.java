package FishAPI.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "familias")
public class Familia {
	@Id
	private String id;
	private int id_familia;
	private String nombre;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
	
	public int getId_familia() {
		return id_familia;
	}

	public void setId_familia(int id_familia) {
		this.id_familia = id_familia;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
}
