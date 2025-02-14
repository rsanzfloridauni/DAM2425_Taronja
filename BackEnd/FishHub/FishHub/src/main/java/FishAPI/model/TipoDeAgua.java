package FishAPI.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "tiposDeAgua")
public class TipoDeAgua {
	@Id
	private String id;
	private int id_tipoDeAgua;
	private String nombre;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
	
	public int getId_tipoDeAgua() {
		return id_tipoDeAgua;
	}

	public void setId_tipoDeAgua(int id_tipoDeAgua) {
		this.id_tipoDeAgua = id_tipoDeAgua;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

}
