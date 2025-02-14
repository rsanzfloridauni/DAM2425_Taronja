package FishAPI.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "localizaciones")
public class Localizacion {
	@Id
	private String id;
	private int id_localizacion;
	private String nombre;

	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	
	public int getId_localizacion() {
		return id_localizacion;
	}

	public void setId_localizacion(int id_localizacion) {
		this.id_localizacion = id_localizacion;
	}
	
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
}
