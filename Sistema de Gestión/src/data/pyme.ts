// Núcleo Retail — mock data

export interface Cliente {
  id: string; nombre: string; empresa: string; email: string; telefono: string;
  sector: string; estado: 'activo' | 'inactivo' | 'vip'; compras: number;
  ingresos_total: number; ultimo_contacto: string; ciudad: string;
}

export interface Lead {
  id: string; nombre: string; empresa: string;
  canal: 'Instagram' | 'Google' | 'Referido' | 'Visita' | 'WhatsApp' | 'TikTok';
  etapa: 'nuevo' | 'contactado' | 'calificado' | 'reunion_agendada' | 'propuesta_enviada' | 'perdido';
  score: number; valor_estimado: number; responsable: string; fecha: string;
}

export interface Venta {
  id: string; cliente: string; fecha: string; monto: number;
  estado: 'completada' | 'pendiente' | 'cancelada' | 'devolucion';
  productos: number; vendedor: string; canal_venta: 'tienda' | 'online' | 'telefono';
}

export interface MovimientoCaja {
  id: string; fecha: string; tipo: 'ingreso' | 'egreso';
  concepto: string; monto: number; saldo: number; categoria: string;
}

export const clientes: Cliente[] = [
  { id: 'c01', nombre: 'Francisca Núñez', empresa: 'Núñez Diseño SpA', email: 'f.nunez@nunezdiseno.cl', telefono: '+56 9 8811 2233', sector: 'Diseño', estado: 'vip', compras: 38, ingresos_total: 12400000, ultimo_contacto: '2026-04-25', ciudad: 'Santiago' },
  { id: 'c02', nombre: 'Cristóbal Muñoz', empresa: 'Muñoz Office', email: 'c.munoz@munozoffice.cl', telefono: '+56 9 7722 3344', sector: 'Oficinas', estado: 'activo', compras: 22, ingresos_total: 7100000, ultimo_contacto: '2026-04-18', ciudad: 'Providencia' },
  { id: 'c03', nombre: 'Lorena Pérez', empresa: 'Pérez & Asociados', email: 'l.perez@perezasoc.cl', telefono: '+56 9 6633 4455', sector: 'Servicios', estado: 'activo', compras: 14, ingresos_total: 4600000, ultimo_contacto: '2026-04-12', ciudad: 'Las Condes' },
  { id: 'c04', nombre: 'Rodrigo Saavedra', empresa: 'Saavedra Contratistas', email: 'r.saavedra@saavedracont.cl', telefono: '+56 9 5544 5566', sector: 'Construcción', estado: 'activo', compras: 19, ingresos_total: 6200000, ultimo_contacto: '2026-04-08', ciudad: 'Maipú' },
  { id: 'c05', nombre: 'Valentina Torres', empresa: 'Torres Arquitectura', email: 'v.torres@torresarq.cl', telefono: '+56 9 4455 6677', sector: 'Arquitectura', estado: 'vip', compras: 51, ingresos_total: 18400000, ultimo_contacto: '2026-04-26', ciudad: 'Vitacura' },
  { id: 'c06', nombre: 'Manuel Ibáñez', empresa: 'Ibáñez Retail Group', email: 'm.ibanez@ibaneretail.cl', telefono: '+56 9 3366 7788', sector: 'Retail', estado: 'activo', compras: 27, ingresos_total: 8900000, ultimo_contacto: '2026-04-15', ciudad: 'Santiago' },
  { id: 'c07', nombre: 'Andrea Vásquez', empresa: 'Vásquez Inmobiliaria', email: 'a.vasquez@vasquezinmob.cl', telefono: '+56 9 9977 8899', sector: 'Inmobiliario', estado: 'activo', compras: 11, ingresos_total: 3600000, ultimo_contacto: '2026-03-28', ciudad: 'Ñuñoa' },
  { id: 'c08', nombre: 'Sebastián Carreño', empresa: 'Carreño Legal', email: 's.carreno@carrenolegal.cl', telefono: '+56 9 8888 9900', sector: 'Legal', estado: 'activo', compras: 16, ingresos_total: 5300000, ultimo_contacto: '2026-04-20', ciudad: 'Las Condes' },
  { id: 'c09', nombre: 'Pamela Molina', empresa: 'Molina Salud SpA', email: 'p.molina@molinasalud.cl', telefono: '+56 9 7799 0011', sector: 'Salud', estado: 'vip', compras: 44, ingresos_total: 16100000, ultimo_contacto: '2026-04-24', ciudad: 'Santiago' },
  { id: 'c10', nombre: 'Diego Castillo', empresa: 'Castillo Educación', email: 'd.castillo@castilloeducacion.cl', telefono: '+56 9 6600 1122', sector: 'Educación', estado: 'activo', compras: 23, ingresos_total: 7600000, ultimo_contacto: '2026-04-10', ciudad: 'La Florida' },
  { id: 'c11', nombre: 'Natalia Caro', empresa: 'Caro Events', email: 'n.caro@caroevents.cl', telefono: '+56 9 5511 2233', sector: 'Eventos', estado: 'activo', compras: 31, ingresos_total: 10200000, ultimo_contacto: '2026-04-22', ciudad: 'Providencia' },
  { id: 'c12', nombre: 'Felipe Rojas', empresa: 'Rojas Consulting', email: 'f.rojas@rojasconsulting.cl', telefono: '+56 9 4422 3344', sector: 'Consultoría', estado: 'activo', compras: 18, ingresos_total: 5900000, ultimo_contacto: '2026-04-14', ciudad: 'Las Condes' },
  { id: 'c13', nombre: 'Camila Espinoza', empresa: 'Espinoza Moda', email: 'c.espinoza@espinozamoda.cl', telefono: '+56 9 3333 4455', sector: 'Moda', estado: 'vip', compras: 62, ingresos_total: 22800000, ultimo_contacto: '2026-04-27', ciudad: 'Vitacura' },
  { id: 'c14', nombre: 'Ignacio Parra', empresa: 'Parra Tech SpA', email: 'i.parra@parratech.cl', telefono: '+56 9 9944 5566', sector: 'Tecnología', estado: 'activo', compras: 29, ingresos_total: 9500000, ultimo_contacto: '2026-04-19', ciudad: 'Santiago' },
  { id: 'c15', nombre: 'Marcela Fuentes', empresa: 'Fuentes Gastronomía', email: 'm.fuentes@fuentesgastro.cl', telefono: '+56 9 8855 6677', sector: 'Gastronomía', estado: 'activo', compras: 35, ingresos_total: 11600000, ultimo_contacto: '2026-04-16', ciudad: 'Ñuñoa' },
  { id: 'c16', nombre: 'Álvaro Reyes', empresa: 'Reyes Gym SpA', email: 'a.reyes@reyesgym.cl', telefono: '+56 9 7766 7788', sector: 'Deporte', estado: 'activo', compras: 21, ingresos_total: 6800000, ultimo_contacto: '2026-04-07', ciudad: 'Maipú' },
  { id: 'c17', nombre: 'Carolina Herrera', empresa: 'Herrera Decoración', email: 'c.herrera@herreradecor.cl', telefono: '+56 9 6677 8899', sector: 'Decoración', estado: 'inactivo', compras: 7, ingresos_total: 2200000, ultimo_contacto: '2026-01-18', ciudad: 'Santiago' },
  { id: 'c18', nombre: 'Javier Morales', empresa: 'Morales Transport', email: 'j.morales@moralestransport.cl', telefono: '+56 9 5588 9900', sector: 'Transporte', estado: 'activo', compras: 13, ingresos_total: 4100000, ultimo_contacto: '2026-03-29', ciudad: 'Pudahuel' },
  { id: 'c19', nombre: 'Macarena Silva', empresa: 'Silva Fotografía', email: 'm.silva@silvafoto.cl', telefono: '+56 9 4499 0011', sector: 'Fotografía', estado: 'activo', compras: 24, ingresos_total: 7900000, ultimo_contacto: '2026-04-21', ciudad: 'Providencia' },
  { id: 'c20', nombre: 'Gonzalo Vera', empresa: 'Vera Finanzas', email: 'g.vera@verafinanzas.cl', telefono: '+56 9 3300 1122', sector: 'Finanzas', estado: 'vip', compras: 47, ingresos_total: 17200000, ultimo_contacto: '2026-04-25', ciudad: 'Las Condes' },
  { id: 'c21', nombre: 'Pilar Alvarado', empresa: 'Alvarado Studio', email: 'p.alvarado@alvaradostudio.cl', telefono: '+56 9 9911 2233', sector: 'Diseño', estado: 'activo', compras: 28, ingresos_total: 9100000, ultimo_contacto: '2026-04-17', ciudad: 'Santiago' },
  { id: 'c22', nombre: 'Ricardo Mendoza', empresa: 'Mendoza Automotriz', email: 'r.mendoza@mendozaauto.cl', telefono: '+56 9 8822 3344', sector: 'Automotriz', estado: 'activo', compras: 16, ingresos_total: 5200000, ultimo_contacto: '2026-04-11', ciudad: 'San Bernardo' },
  { id: 'c23', nombre: 'Sofía Lagos', empresa: 'Lagos Wellness', email: 's.lagos@lagoswellness.cl', telefono: '+56 9 7733 4455', sector: 'Salud', estado: 'activo', compras: 33, ingresos_total: 10900000, ultimo_contacto: '2026-04-23', ciudad: 'Providencia' },
  { id: 'c24', nombre: 'Pablo Castro', empresa: 'Castro Digital', email: 'p.castro@castrodigital.cl', telefono: '+56 9 6644 5566', sector: 'Tecnología', estado: 'activo', compras: 20, ingresos_total: 6600000, ultimo_contacto: '2026-04-13', ciudad: 'Santiago' },
  { id: 'c25', nombre: 'Daniela Ortega', empresa: 'Ortega Boutique', email: 'd.ortega@ortegaboutique.cl', telefono: '+56 9 5555 6677', sector: 'Moda', estado: 'vip', compras: 58, ingresos_total: 21300000, ultimo_contacto: '2026-04-26', ciudad: 'Vitacura' },
  { id: 'c26', nombre: 'Eduardo Muñoz', empresa: 'Muñoz HR', email: 'e.munoz@munozhr.cl', telefono: '+56 9 4466 7788', sector: 'Recursos Humanos', estado: 'activo', compras: 17, ingresos_total: 5600000, ultimo_contacto: '2026-04-06', ciudad: 'Las Condes' },
  { id: 'c27', nombre: 'Constanza Rivas', empresa: 'Rivas Garden', email: 'c.rivas@rivasgarden.cl', telefono: '+56 9 3377 8899', sector: 'Jardín', estado: 'activo', compras: 25, ingresos_total: 8200000, ultimo_contacto: '2026-04-18', ciudad: 'Ñuñoa' },
  { id: 'c28', nombre: 'Tomás Araya', empresa: 'Araya Seguridad', email: 't.araya@arayaseguridad.cl', telefono: '+56 9 9988 9900', sector: 'Seguridad', estado: 'inactivo', compras: 5, ingresos_total: 1700000, ultimo_contacto: '2025-12-22', ciudad: 'Santiago' },
  { id: 'c29', nombre: 'Verónica Campos', empresa: 'Campos Cosmética', email: 'v.campos@camposcosmetica.cl', telefono: '+56 9 8899 0011', sector: 'Cosmética', estado: 'activo', compras: 39, ingresos_total: 12900000, ultimo_contacto: '2026-04-24', ciudad: 'Las Condes' },
  { id: 'c30', nombre: 'Mauricio Leiva', empresa: 'Leiva Construcciones', email: 'm.leiva@leivaconstruc.cl', telefono: '+56 9 7700 1122', sector: 'Construcción', estado: 'activo', compras: 12, ingresos_total: 3900000, ultimo_contacto: '2026-03-25', ciudad: 'Maipú' },
  { id: 'c31', nombre: 'Fernanda Díaz', empresa: 'Díaz Catering', email: 'f.diaz@diazcatering.cl', telefono: '+56 9 6611 2233', sector: 'Gastronomía', estado: 'activo', compras: 26, ingresos_total: 8600000, ultimo_contacto: '2026-04-09', ciudad: 'Providencia' },
  { id: 'c32', nombre: 'Cristian Soto', empresa: 'Soto Ingeniería', email: 'c.soto@sotoing.cl', telefono: '+56 9 5522 3344', sector: 'Ingeniería', estado: 'activo', compras: 18, ingresos_total: 5900000, ultimo_contacto: '2026-04-16', ciudad: 'Santiago' },
  { id: 'c33', nombre: 'Alejandra Contreras', empresa: 'Contreras Arte', email: 'a.contreras@contrerasarte.cl', telefono: '+56 9 4433 4455', sector: 'Arte', estado: 'vip', compras: 45, ingresos_total: 16600000, ultimo_contacto: '2026-04-25', ciudad: 'Bellavista' },
  { id: 'c34', nombre: 'Jorge Carvajal', empresa: 'Carvajal Media', email: 'j.carvajal@carvajalmedia.cl', telefono: '+56 9 3344 5566', sector: 'Medios', estado: 'activo', compras: 22, ingresos_total: 7200000, ultimo_contacto: '2026-04-14', ciudad: 'Santiago' },
  { id: 'c35', nombre: 'Rosa Espejo', empresa: 'Espejo Kids', email: 'r.espejo@espejokids.cl', telefono: '+56 9 9900 6677', sector: 'Infantil', estado: 'activo', compras: 30, ingresos_total: 9900000, ultimo_contacto: '2026-04-20', ciudad: 'La Florida' },
  { id: 'c36', nombre: 'Héctor Meza', empresa: 'Meza Impresiones', email: 'h.meza@mezaimp.cl', telefono: '+56 9 8811 7788', sector: 'Impresión', estado: 'activo', compras: 14, ingresos_total: 4600000, ultimo_contacto: '2026-04-05', ciudad: 'Santiago' },
  { id: 'c37', nombre: 'Patricia Flores', empresa: 'Flores Nutrición', email: 'p.flores@floresnutricion.cl', telefono: '+56 9 7722 8899', sector: 'Salud', estado: 'activo', compras: 27, ingresos_total: 8800000, ultimo_contacto: '2026-04-21', ciudad: 'Providencia' },
  { id: 'c38', nombre: 'Sergio Gómez', empresa: 'Gómez Seguridad SpA', email: 's.gomez@gomezseguridad.cl', telefono: '+56 9 6633 9900', sector: 'Seguridad', estado: 'activo', compras: 19, ingresos_total: 6200000, ultimo_contacto: '2026-04-12', ciudad: 'Santiago' },
  { id: 'c39', nombre: 'Mariana Ibarra', empresa: 'Ibarra Hogar', email: 'm.ibarra@ibarrahogar.cl', telefono: '+56 9 5544 0011', sector: 'Hogar', estado: 'inactivo', compras: 6, ingresos_total: 2000000, ultimo_contacto: '2026-02-08', ciudad: 'Maipú' },
  { id: 'c40', nombre: 'Andrés Naranjo', empresa: 'Naranjo Electrónica', email: 'a.naranjo@naranjoelectronica.cl', telefono: '+56 9 4455 1122', sector: 'Electrónica', estado: 'vip', compras: 53, ingresos_total: 19400000, ultimo_contacto: '2026-04-27', ciudad: 'Las Condes' },
  { id: 'c41', nombre: 'Claudia Vargas', empresa: 'Vargas Beauty', email: 'c.vargas@vargasbeauty.cl', telefono: '+56 9 3366 2233', sector: 'Cosmética', estado: 'activo', compras: 34, ingresos_total: 11100000, ultimo_contacto: '2026-04-19', ciudad: 'Providencia' },
  { id: 'c42', nombre: 'Esteban Gutiérrez', empresa: 'Gutiérrez Sport', email: 'e.gutierrez@gutierrezsport.cl', telefono: '+56 9 9977 3344', sector: 'Deporte', estado: 'activo', compras: 21, ingresos_total: 6900000, ultimo_contacto: '2026-04-11', ciudad: 'Ñuñoa' },
  { id: 'c43', nombre: 'Javiera Acuña', empresa: 'Acuña Studio Yoga', email: 'j.acuna@acunayoga.cl', telefono: '+56 9 8888 4455', sector: 'Bienestar', estado: 'activo', compras: 16, ingresos_total: 5300000, ultimo_contacto: '2026-04-07', ciudad: 'Bellavista' },
  { id: 'c44', nombre: 'Luis Palma', empresa: 'Palma Tech', email: 'l.palma@palmatech.cl', telefono: '+56 9 7799 5566', sector: 'Tecnología', estado: 'activo', compras: 28, ingresos_total: 9200000, ultimo_contacto: '2026-04-22', ciudad: 'Santiago' },
  { id: 'c45', nombre: 'Ana Mendez', empresa: 'Mendez Educativo', email: 'a.mendez@mendezeducativo.cl', telefono: '+56 9 6600 6677', sector: 'Educación', estado: 'activo', compras: 20, ingresos_total: 6600000, ultimo_contacto: '2026-04-15', ciudad: 'La Florida' },
  { id: 'c46', nombre: 'Raúl Peña', empresa: 'Peña Logística Express', email: 'r.pena@penalexpress.cl', telefono: '+56 9 5511 7788', sector: 'Logística', estado: 'activo', compras: 15, ingresos_total: 4900000, ultimo_contacto: '2026-04-04', ciudad: 'Pudahuel' },
  { id: 'c47', nombre: 'Simona Cruz', empresa: 'Cruz Interiorismo', email: 's.cruz@cruzinteriorismo.cl', telefono: '+56 9 4422 8899', sector: 'Decoración', estado: 'vip', compras: 49, ingresos_total: 18000000, ultimo_contacto: '2026-04-26', ciudad: 'Vitacura' },
  { id: 'c48', nombre: 'Matías Roble', empresa: 'Roble Agricola SpA', email: 'm.roble@robleagricola.cl', telefono: '+56 9 3333 9900', sector: 'Agricultura', estado: 'activo', compras: 12, ingresos_total: 3800000, ultimo_contacto: '2026-03-20', ciudad: 'Santiago' },
  { id: 'c49', nombre: 'Isabel Farías', empresa: 'Farías Marketing', email: 'i.farias@fariasmarketing.cl', telefono: '+56 9 9944 0011', sector: 'Marketing', estado: 'activo', compras: 24, ingresos_total: 7800000, ultimo_contacto: '2026-04-17', ciudad: 'Providencia' },
  { id: 'c50', nombre: 'Alejandro Mora', empresa: 'Mora Legal SpA', email: 'a.mora@moralegal.cl', telefono: '+56 9 8855 1122', sector: 'Legal', estado: 'activo', compras: 18, ingresos_total: 5800000, ultimo_contacto: '2026-04-10', ciudad: 'Las Condes' },
  { id: 'c51', nombre: 'Bárbara Olivares', empresa: 'Olivares Eventos', email: 'b.olivares@olivareseventos.cl', telefono: '+56 9 7766 2233', sector: 'Eventos', estado: 'activo', compras: 29, ingresos_total: 9600000, ultimo_contacto: '2026-04-23', ciudad: 'Santiago' },
  { id: 'c52', nombre: 'Daniel Barraza', empresa: 'Barraza Fintech', email: 'd.barraza@barrazafintech.cl', telefono: '+56 9 6677 3344', sector: 'Finanzas', estado: 'activo', compras: 22, ingresos_total: 7200000, ultimo_contacto: '2026-04-13', ciudad: 'Las Condes' },
  { id: 'c53', nombre: 'Verónica Godoy', empresa: 'Godoy Terapias', email: 'v.godoy@godoyterapias.cl', telefono: '+56 9 5588 4455', sector: 'Salud', estado: 'activo', compras: 17, ingresos_total: 5500000, ultimo_contacto: '2026-04-06', ciudad: 'Providencia' },
  { id: 'c54', nombre: 'César Vidal', empresa: 'Vidal Restaurante', email: 'c.vidal@vidalrestaurante.cl', telefono: '+56 9 4499 5566', sector: 'Gastronomía', estado: 'vip', compras: 55, ingresos_total: 20100000, ultimo_contacto: '2026-04-25', ciudad: 'Bellavista' },
  { id: 'c55', nombre: 'Rocío Zapata', empresa: 'Zapata Kids Wear', email: 'r.zapata@zapatakidswear.cl', telefono: '+56 9 3300 6677', sector: 'Moda', estado: 'activo', compras: 31, ingresos_total: 10200000, ultimo_contacto: '2026-04-20', ciudad: 'Santiago' },
  { id: 'c56', nombre: 'Gabriel Cisternas', empresa: 'Cisternas IT', email: 'g.cisternas@cisternasiit.cl', telefono: '+56 9 9911 7788', sector: 'Tecnología', estado: 'activo', compras: 26, ingresos_total: 8500000, ultimo_contacto: '2026-04-16', ciudad: 'Santiago' },
  { id: 'c57', nombre: 'Sandra Espinosa', empresa: 'Espinosa Flores', email: 's.espinosa@espinosaflores.cl', telefono: '+56 9 8822 8899', sector: 'Flores', estado: 'activo', compras: 20, ingresos_total: 6500000, ultimo_contacto: '2026-04-09', ciudad: 'Ñuñoa' },
  { id: 'c58', nombre: 'Oscar Paredes', empresa: 'Paredes Films', email: 'o.paredes@paredesfilms.cl', telefono: '+56 9 7733 9900', sector: 'Medios', estado: 'activo', compras: 14, ingresos_total: 4500000, ultimo_contacto: '2026-04-03', ciudad: 'Santiago' },
  { id: 'c59', nombre: 'Lucía Ibáñez', empresa: 'Ibáñez Yoga Studio', email: 'l.ibanez@ibanezyoga.cl', telefono: '+56 9 6644 0011', sector: 'Bienestar', estado: 'inactivo', compras: 8, ingresos_total: 2600000, ultimo_contacto: '2026-01-30', ciudad: 'Providencia' },
  { id: 'c60', nombre: 'Héctor Salinas', empresa: 'Salinas Automotriz', email: 'h.salinas@salinasauto.cl', telefono: '+56 9 5555 1122', sector: 'Automotriz', estado: 'activo', compras: 19, ingresos_total: 6200000, ultimo_contacto: '2026-04-21', ciudad: 'San Bernardo' },
  { id: 'c61', nombre: 'Marisol Rojas', empresa: 'Rojas Pet Shop', email: 'm.rojas@rojaspetshop.cl', telefono: '+56 9 4466 2233', sector: 'Mascotas', estado: 'activo', compras: 36, ingresos_total: 11800000, ultimo_contacto: '2026-04-24', ciudad: 'La Florida' },
  { id: 'c62', nombre: 'Patricio Bravo', empresa: 'Bravo Inversiones', email: 'p.bravo@bravoinversiones.cl', telefono: '+56 9 3377 3344', sector: 'Finanzas', estado: 'vip', compras: 41, ingresos_total: 15100000, ultimo_contacto: '2026-04-27', ciudad: 'Vitacura' },
  { id: 'c63', nombre: 'Ximena Acevedo', empresa: 'Acevedo Moda Studio', email: 'x.acevedo@acevedomoda.cl', telefono: '+56 9 9988 4455', sector: 'Moda', estado: 'activo', compras: 28, ingresos_total: 9100000, ultimo_contacto: '2026-04-18', ciudad: 'Providencia' },
  { id: 'c64', nombre: 'Fernando Cid', empresa: 'Cid Veterinaria', email: 'f.cid@cidveterinaria.cl', telefono: '+56 9 8899 5566', sector: 'Mascotas', estado: 'activo', compras: 23, ingresos_total: 7500000, ultimo_contacto: '2026-04-11', ciudad: 'Maipú' },
  { id: 'c65', nombre: 'Valentina Cáceres', empresa: 'Cáceres Studio Pilates', email: 'v.caceres@cacerespilates.cl', telefono: '+56 9 7700 6677', sector: 'Bienestar', estado: 'activo', compras: 19, ingresos_total: 6200000, ultimo_contacto: '2026-04-15', ciudad: 'Las Condes' },
  { id: 'c66', nombre: 'Rodrigo Opazo', empresa: 'Opazo Gastronomía SpA', email: 'r.opazo@opazogastro.cl', telefono: '+56 9 6611 7788', sector: 'Gastronomía', estado: 'activo', compras: 32, ingresos_total: 10400000, ultimo_contacto: '2026-04-22', ciudad: 'Bellavista' },
  { id: 'c67', nombre: 'Carolina Bustamante', empresa: 'Bustamante Decoración', email: 'c.bustamante@bustamantedecor.cl', telefono: '+56 9 5522 8899', sector: 'Decoración', estado: 'activo', compras: 15, ingresos_total: 4800000, ultimo_contacto: '2026-04-08', ciudad: 'Santiago' },
  { id: 'c68', nombre: 'Nicolás Quiñones', empresa: 'Quiñones Art Gallery', email: 'n.quinones@quinonesart.cl', telefono: '+56 9 4433 9900', sector: 'Arte', estado: 'activo', compras: 11, ingresos_total: 3600000, ultimo_contacto: '2026-03-31', ciudad: 'Santiago' },
  { id: 'c69', nombre: 'Catalina Fuenzalida', empresa: 'Fuenzalida Design', email: 'c.fuenzalida@fuenzalidadesign.cl', telefono: '+56 9 3344 0011', sector: 'Diseño', estado: 'vip', compras: 43, ingresos_total: 15700000, ultimo_contacto: '2026-04-26', ciudad: 'Santiago' },
  { id: 'c70', nombre: 'Álvaro Medina', empresa: 'Medina Print', email: 'a.medina@medinaprint.cl', telefono: '+56 9 9900 1122', sector: 'Impresión', estado: 'activo', compras: 17, ingresos_total: 5600000, ultimo_contacto: '2026-04-14', ciudad: 'Santiago' },
  { id: 'c71', nombre: 'Luciana Pizarro', empresa: 'Pizarro Coaching', email: 'l.pizarro@pizarrocoaching.cl', telefono: '+56 9 8811 2244', sector: 'Consultoría', estado: 'activo', compras: 21, ingresos_total: 6800000, ultimo_contacto: '2026-04-19', ciudad: 'Las Condes' },
  { id: 'c72', nombre: 'Tomás Montoya', empresa: 'Montoya Electro', email: 't.montoya@montoyaelectro.cl', telefono: '+56 9 7722 3355', sector: 'Electrónica', estado: 'activo', compras: 25, ingresos_total: 8100000, ultimo_contacto: '2026-04-13', ciudad: 'Santiago' },
  { id: 'c73', nombre: 'Victoria Sepúlveda', empresa: 'Sepúlveda Cosmética Natural', email: 'v.sepulveda@sepulvedanatural.cl', telefono: '+56 9 6633 4466', sector: 'Cosmética', estado: 'vip', compras: 48, ingresos_total: 17600000, ultimo_contacto: '2026-04-27', ciudad: 'Vitacura' },
  { id: 'c74', nombre: 'Emilio Arriagada', empresa: 'Arriagada Sports', email: 'e.arriagada@arriagadasports.cl', telefono: '+56 9 5544 5577', sector: 'Deporte', estado: 'activo', compras: 20, ingresos_total: 6500000, ultimo_contacto: '2026-04-10', ciudad: 'Santiago' },
  { id: 'c75', nombre: 'Graciela Pedreros', empresa: 'Pedreros Catering', email: 'g.pedreros@pedreroscatering.cl', telefono: '+56 9 4455 6688', sector: 'Gastronomía', estado: 'activo', compras: 24, ingresos_total: 7800000, ultimo_contacto: '2026-04-17', ciudad: 'Ñuñoa' },
  { id: 'c76', nombre: 'Jorge Araneda', empresa: 'Araneda Turismo', email: 'j.araneda@araneadaturismo.cl', telefono: '+56 9 3366 7799', sector: 'Turismo', estado: 'activo', compras: 13, ingresos_total: 4200000, ultimo_contacto: '2026-03-27', ciudad: 'Providencia' },
  { id: 'c77', nombre: 'Beatriz Cornejo', empresa: 'Cornejo Spa', email: 'b.cornejo@cornejospa.cl', telefono: '+56 9 9977 8800', sector: 'Bienestar', estado: 'activo', compras: 30, ingresos_total: 9800000, ultimo_contacto: '2026-04-23', ciudad: 'Las Condes' },
  { id: 'c78', nombre: 'Samuel Lobos', empresa: 'Lobos Fotografía Comercial', email: 's.lobos@lobosfoto.cl', telefono: '+56 9 8888 9911', sector: 'Fotografía', estado: 'activo', compras: 18, ingresos_total: 5900000, ultimo_contacto: '2026-04-16', ciudad: 'Santiago' },
  { id: 'c79', nombre: 'Javiera Troncoso', empresa: 'Troncoso Yoga & Meditación', email: 'j.troncoso@troncosoyoga.cl', telefono: '+56 9 7799 0022', sector: 'Bienestar', estado: 'activo', compras: 22, ingresos_total: 7200000, ultimo_contacto: '2026-04-20', ciudad: 'Bellavista' },
  { id: 'c80', nombre: 'Rodrigo Wester', empresa: 'Wester Arquitectura SpA', email: 'r.wester@westerarquitectura.cl', telefono: '+56 9 6600 1133', sector: 'Arquitectura', estado: 'vip', compras: 44, ingresos_total: 16000000, ultimo_contacto: '2026-04-25', ciudad: 'Las Condes' },
  { id: 'c81', nombre: 'Ángela Restrepo', empresa: 'Restrepo Candles', email: 'a.restrepo@restrepocandles.cl', telefono: '+56 9 5511 2244', sector: 'Hogar', estado: 'activo', compras: 26, ingresos_total: 8400000, ultimo_contacto: '2026-04-12', ciudad: 'Santiago' },
  { id: 'c82', nombre: 'Hernán Cárdenas', empresa: 'Cárdenas Óptica', email: 'h.cardenas@cardenasoptica.cl', telefono: '+56 9 4422 3355', sector: 'Salud', estado: 'activo', compras: 14, ingresos_total: 4600000, ultimo_contacto: '2026-04-07', ciudad: 'Maipú' },
  { id: 'c83', nombre: 'Nicole Arredondo', empresa: 'Arredondo Baby Store', email: 'n.arredondo@arredondababy.cl', telefono: '+56 9 3333 4466', sector: 'Infantil', estado: 'activo', compras: 28, ingresos_total: 9100000, ultimo_contacto: '2026-04-21', ciudad: 'La Florida' },
  { id: 'c84', nombre: 'Diego Villanueva', empresa: 'Villanueva Renovables', email: 'd.villanueva@villanuevarenovables.cl', telefono: '+56 9 9944 5577', sector: 'Energía', estado: 'activo', compras: 17, ingresos_total: 5500000, ultimo_contacto: '2026-04-14', ciudad: 'Santiago' },
  { id: 'c85', nombre: 'Rebeca Aliste', empresa: 'Aliste Pet Care', email: 'r.aliste@alistepetcare.cl', telefono: '+56 9 8855 6688', sector: 'Mascotas', estado: 'activo', compras: 23, ingresos_total: 7500000, ultimo_contacto: '2026-04-18', ciudad: 'Providencia' },
]

export const leads: Lead[] = [
  { id: 'l01', nombre: 'Valentina Ponce', empresa: 'Ponce Studio', canal: 'Instagram', etapa: 'calificado', score: 82, valor_estimado: 1800000, responsable: 'Camila R.', fecha: '2026-04-10' },
  { id: 'l02', nombre: 'Tomás Cáceres', empresa: 'Cáceres Diseño', canal: 'Google', etapa: 'propuesta_enviada', score: 88, valor_estimado: 2400000, responsable: 'Pedro V.', fecha: '2026-04-15' },
  { id: 'l03', nombre: 'Paola Mora', empresa: 'Mora Wellness', canal: 'Referido', etapa: 'reunion_agendada', score: 91, valor_estimado: 3100000, responsable: 'Camila R.', fecha: '2026-04-08' },
  { id: 'l04', nombre: 'Luis Henríquez', empresa: 'Henríquez Café', canal: 'Visita', etapa: 'contactado', score: 65, valor_estimado: 1200000, responsable: 'Pedro V.', fecha: '2026-04-20' },
  { id: 'l05', nombre: 'Javiera Soto', empresa: 'Soto Boutique', canal: 'Instagram', etapa: 'nuevo', score: 48, valor_estimado: 900000, responsable: 'Camila R.', fecha: '2026-04-24' },
  { id: 'l06', nombre: 'Arturo Figueroa', empresa: 'Figueroa Arte', canal: 'TikTok', etapa: 'calificado', score: 76, valor_estimado: 1600000, responsable: 'Pedro V.', fecha: '2026-04-07' },
  { id: 'l07', nombre: 'Carolina Méndez', empresa: 'Méndez Estudio', canal: 'Google', etapa: 'reunion_agendada', score: 85, valor_estimado: 2800000, responsable: 'Camila R.', fecha: '2026-04-12' },
  { id: 'l08', nombre: 'Felipe Bravo', empresa: 'Bravo Tech Store', canal: 'Referido', etapa: 'propuesta_enviada', score: 93, valor_estimado: 4200000, responsable: 'Pedro V.', fecha: '2026-04-14' },
  { id: 'l09', nombre: 'Melissa Lagos', empresa: 'Lagos Moda', canal: 'Instagram', etapa: 'contactado', score: 57, valor_estimado: 1100000, responsable: 'Camila R.', fecha: '2026-04-21' },
  { id: 'l10', nombre: 'Rodrigo Salas', empresa: 'Salas Office Supply', canal: 'WhatsApp', etapa: 'nuevo', score: 39, valor_estimado: 800000, responsable: 'Pedro V.', fecha: '2026-04-26' },
  { id: 'l11', nombre: 'Soledad Vega', empresa: 'Vega Decoración', canal: 'Google', etapa: 'calificado', score: 79, valor_estimado: 2100000, responsable: 'Camila R.', fecha: '2026-04-05' },
  { id: 'l12', nombre: 'Felipe Navarrete', empresa: 'Navarrete Garden', canal: 'Visita', etapa: 'contactado', score: 62, valor_estimado: 1400000, responsable: 'Pedro V.', fecha: '2026-04-18' },
  { id: 'l13', nombre: 'Isidora Robles', empresa: 'Robles Kids', canal: 'Instagram', etapa: 'reunion_agendada', score: 87, valor_estimado: 3400000, responsable: 'Camila R.', fecha: '2026-04-09' },
  { id: 'l14', nombre: 'Gonzalo Arteaga', empresa: 'Arteaga Electrónica', canal: 'TikTok', etapa: 'nuevo', score: 42, valor_estimado: 950000, responsable: 'Pedro V.', fecha: '2026-04-25' },
  { id: 'l15', nombre: 'Andrea Castillo', empresa: 'Castillo Spa', canal: 'Referido', etapa: 'propuesta_enviada', score: 90, valor_estimado: 3800000, responsable: 'Camila R.', fecha: '2026-04-06' },
  { id: 'l16', nombre: 'Pablo Espinoza', empresa: 'Espinoza Print', canal: 'WhatsApp', etapa: 'contactado', score: 55, valor_estimado: 1300000, responsable: 'Pedro V.', fecha: '2026-04-22' },
  { id: 'l17', nombre: 'Sandra Vidal', empresa: 'Vidal Nutrición', canal: 'Google', etapa: 'calificado', score: 74, valor_estimado: 1900000, responsable: 'Camila R.', fecha: '2026-04-03' },
  { id: 'l18', nombre: 'Matías Alvarado', empresa: 'Alvarado Turismo', canal: 'Instagram', etapa: 'perdido', score: 22, valor_estimado: 1600000, responsable: 'Pedro V.', fecha: '2026-03-18' },
  { id: 'l19', nombre: 'Fabiola Montoya', empresa: 'Montoya Cosmética', canal: 'TikTok', etapa: 'calificado', score: 81, valor_estimado: 2500000, responsable: 'Camila R.', fecha: '2026-04-11' },
  { id: 'l20', nombre: 'Ignacio Meza', empresa: 'Meza Pet Store', canal: 'Referido', etapa: 'reunion_agendada', score: 89, valor_estimado: 3200000, responsable: 'Pedro V.', fecha: '2026-04-16' },
  { id: 'l21', nombre: 'Carola Fuentes', empresa: 'Fuentes Fotografía', canal: 'Google', etapa: 'contactado', score: 60, valor_estimado: 1200000, responsable: 'Camila R.', fecha: '2026-04-19' },
  { id: 'l22', nombre: 'Sebastián Ríos', empresa: 'Ríos Fitness', canal: 'Instagram', etapa: 'nuevo', score: 44, valor_estimado: 880000, responsable: 'Pedro V.', fecha: '2026-04-27' },
  { id: 'l23', nombre: 'Claudia Morales', empresa: 'Morales Art Studio', canal: 'WhatsApp', etapa: 'calificado', score: 70, valor_estimado: 1700000, responsable: 'Camila R.', fecha: '2026-04-04' },
  { id: 'l24', nombre: 'Jorge Fuentes', empresa: 'Fuentes Automotriz', canal: 'Visita', etapa: 'perdido', score: 18, valor_estimado: 2200000, responsable: 'Pedro V.', fecha: '2026-03-12' },
  { id: 'l25', nombre: 'Tamara Venegas', empresa: 'Venegas Hogar', canal: 'TikTok', etapa: 'propuesta_enviada', score: 86, valor_estimado: 2900000, responsable: 'Camila R.', fecha: '2026-04-02' },
  { id: 'l26', nombre: 'Cristóbal Hernández', empresa: 'Hernández Café Gourmet', canal: 'Referido', etapa: 'reunion_agendada', score: 92, valor_estimado: 4600000, responsable: 'Pedro V.', fecha: '2026-04-01' },
  { id: 'l27', nombre: 'Pamela Sandoval', empresa: 'Sandoval Estética', canal: 'Instagram', etapa: 'contactado', score: 58, valor_estimado: 1100000, responsable: 'Camila R.', fecha: '2026-04-23' },
  { id: 'l28', nombre: 'Eric Berríos', empresa: 'Berríos Tech', canal: 'Google', etapa: 'calificado', score: 77, valor_estimado: 2000000, responsable: 'Pedro V.', fecha: '2026-04-17' },
  { id: 'l29', nombre: 'Camila Cáceres', empresa: 'Cáceres Pilates', canal: 'WhatsApp', etapa: 'nuevo', score: 36, valor_estimado: 750000, responsable: 'Camila R.', fecha: '2026-04-26' },
  { id: 'l30', nombre: 'Mauricio Oviedo', empresa: 'Oviedo Media', canal: 'TikTok', etapa: 'calificado', score: 73, valor_estimado: 1800000, responsable: 'Pedro V.', fecha: '2026-04-13' },
  { id: 'l31', nombre: 'Valeria Maldonado', empresa: 'Maldonado Studio Danza', canal: 'Instagram', etapa: 'contactado', score: 52, valor_estimado: 1000000, responsable: 'Camila R.', fecha: '2026-04-20' },
  { id: 'l32', nombre: 'Rodrigo Cerda', empresa: 'Cerda Bebidas SpA', canal: 'Visita', etapa: 'reunion_agendada', score: 84, valor_estimado: 3600000, responsable: 'Pedro V.', fecha: '2026-04-08' },
  { id: 'l33', nombre: 'Natalia Pino', empresa: 'Pino Niños', canal: 'Referido', etapa: 'propuesta_enviada', score: 88, valor_estimado: 3100000, responsable: 'Camila R.', fecha: '2026-04-05' },
  { id: 'l34', nombre: 'Oscar Mansilla', empresa: 'Mansilla Agro', canal: 'Google', etapa: 'nuevo', score: 40, valor_estimado: 850000, responsable: 'Pedro V.', fecha: '2026-04-24' },
  { id: 'l35', nombre: 'Katherine Vera', empresa: 'Vera Cosmética', canal: 'TikTok', etapa: 'calificado', score: 78, valor_estimado: 2200000, responsable: 'Camila R.', fecha: '2026-04-10' },
  { id: 'l36', nombre: 'Alejandro Donoso', empresa: 'Donoso Legal', canal: 'WhatsApp', etapa: 'contactado', score: 63, valor_estimado: 1500000, responsable: 'Pedro V.', fecha: '2026-04-21' },
  { id: 'l37', nombre: 'Paula Araya', empresa: 'Araya Florería', canal: 'Instagram', etapa: 'nuevo', score: 45, valor_estimado: 920000, responsable: 'Camila R.', fecha: '2026-04-27' },
  { id: 'l38', nombre: 'Diego Parra', empresa: 'Parra Electro', canal: 'Google', etapa: 'calificado', score: 72, valor_estimado: 1900000, responsable: 'Pedro V.', fecha: '2026-04-07' },
  { id: 'l39', nombre: 'María Paz Núñez', empresa: 'Núñez Terapias', canal: 'Referido', etapa: 'propuesta_enviada', score: 95, valor_estimado: 5200000, responsable: 'Camila R.', fecha: '2026-04-03' },
  { id: 'l40', nombre: 'Franco Astudillo', empresa: 'Astudillo Gym', canal: 'TikTok', etapa: 'perdido', score: 15, valor_estimado: 1400000, responsable: 'Pedro V.', fecha: '2026-03-08' },
  { id: 'l41', nombre: 'Catalina Torres', empresa: 'Torres Repostería', canal: 'Instagram', etapa: 'nuevo', score: 50, valor_estimado: 980000, responsable: 'Camila R.', fecha: '2026-04-25' },
  { id: 'l42', nombre: 'Iván Leiva', empresa: 'Leiva Electrónica', canal: 'WhatsApp', etapa: 'contactado', score: 56, valor_estimado: 1300000, responsable: 'Pedro V.', fecha: '2026-04-19' },
  { id: 'l43', nombre: 'Renata Espinosa', empresa: 'Espinosa Yoga', canal: 'Google', etapa: 'calificado', score: 80, valor_estimado: 2300000, responsable: 'Camila R.', fecha: '2026-04-11' },
  { id: 'l44', nombre: 'Benjamín Coloma', empresa: 'Coloma Studio', canal: 'Visita', etapa: 'reunion_agendada', score: 87, valor_estimado: 3700000, responsable: 'Pedro V.', fecha: '2026-04-06' },
  { id: 'l45', nombre: 'Francisca Lastra', empresa: 'Lastra Kids', canal: 'Instagram', etapa: 'nuevo', score: 38, valor_estimado: 820000, responsable: 'Camila R.', fecha: '2026-04-26' },
  { id: 'l46', nombre: 'Germán Oyarzún', empresa: 'Oyarzún Catering', canal: 'Referido', etapa: 'propuesta_enviada', score: 91, valor_estimado: 4400000, responsable: 'Pedro V.', fecha: '2026-04-04' },
  { id: 'l47', nombre: 'Constanza Muñoz', empresa: 'Muñoz Decoración', canal: 'TikTok', etapa: 'calificado', score: 75, valor_estimado: 1950000, responsable: 'Camila R.', fecha: '2026-04-14' },
  { id: 'l48', nombre: 'Álvaro Poblete', empresa: 'Poblete Fitness', canal: 'WhatsApp', etapa: 'contactado', score: 49, valor_estimado: 950000, responsable: 'Pedro V.', fecha: '2026-04-22' },
  { id: 'l49', nombre: 'Daniela Mellado', empresa: 'Mellado Boutique', canal: 'Google', etapa: 'calificado', score: 83, valor_estimado: 2600000, responsable: 'Camila R.', fecha: '2026-04-09' },
  { id: 'l50', nombre: 'Raúl Vergara', empresa: 'Vergara Office', canal: 'Instagram', etapa: 'nuevo', score: 43, valor_estimado: 890000, responsable: 'Pedro V.', fecha: '2026-04-23' },
  { id: 'l51', nombre: 'Javiera Olivares', empresa: 'Olivares Cosmética', canal: 'TikTok', etapa: 'contactado', score: 61, valor_estimado: 1450000, responsable: 'Camila R.', fecha: '2026-04-16' },
  { id: 'l52', nombre: 'Stefan Wulf', empresa: 'Wulf Architecture', canal: 'Referido', etapa: 'reunion_agendada', score: 94, valor_estimado: 5800000, responsable: 'Pedro V.', fecha: '2026-04-01' },
  { id: 'l53', nombre: 'Camilo Rodríguez', empresa: 'Rodríguez Galería', canal: 'Visita', etapa: 'calificado', score: 69, valor_estimado: 1700000, responsable: 'Camila R.', fecha: '2026-04-17' },
  { id: 'l54', nombre: 'Margarita Farías', empresa: 'Farías Repostería', canal: 'Instagram', etapa: 'nuevo', score: 46, valor_estimado: 960000, responsable: 'Pedro V.', fecha: '2026-04-27' },
  { id: 'l55', nombre: 'Edgardo Camus', empresa: 'Camus Media', canal: 'Google', etapa: 'propuesta_enviada', score: 85, valor_estimado: 3000000, responsable: 'Camila R.', fecha: '2026-04-02' },
  { id: 'l56', nombre: 'Loreto Fuentes', empresa: 'Fuentes Kids Fashion', canal: 'TikTok', etapa: 'calificado', score: 71, valor_estimado: 1850000, responsable: 'Pedro V.', fecha: '2026-04-12' },
  { id: 'l57', nombre: 'Guillermo Baeza', empresa: 'Baeza Renovables', canal: 'WhatsApp', etapa: 'contactado', score: 54, valor_estimado: 1250000, responsable: 'Camila R.', fecha: '2026-04-20' },
  { id: 'l58', nombre: 'Natalia Acuña', empresa: 'Acuña Salud', canal: 'Referido', etapa: 'reunion_agendada', score: 90, valor_estimado: 4000000, responsable: 'Pedro V.', fecha: '2026-04-13' },
  { id: 'l59', nombre: 'Tomás Uribe', empresa: 'Uribe Photo Studio', canal: 'Instagram', etapa: 'nuevo', score: 41, valor_estimado: 870000, responsable: 'Camila R.', fecha: '2026-04-25' },
  { id: 'l60', nombre: 'Rosa Cárdenas', empresa: 'Cárdenas Moda Infantil', canal: 'Google', etapa: 'calificado', score: 77, valor_estimado: 2050000, responsable: 'Pedro V.', fecha: '2026-04-15' },
]

export const ventas: Venta[] = [
  { id: 'v001', cliente: 'Camila Espinoza', fecha: '2026-04-27', monto: 620000, estado: 'completada', productos: 4, vendedor: 'Camila R.', canal_venta: 'tienda' },
  { id: 'v002', cliente: 'Valentina Torres', fecha: '2026-04-27', monto: 980000, estado: 'completada', productos: 6, vendedor: 'Pedro V.', canal_venta: 'online' },
  { id: 'v003', cliente: 'Daniela Ortega', fecha: '2026-04-26', monto: 1240000, estado: 'completada', productos: 8, vendedor: 'Camila R.', canal_venta: 'tienda' },
  { id: 'v004', cliente: 'Andrés Naranjo', fecha: '2026-04-26', monto: 820000, estado: 'pendiente', productos: 5, vendedor: 'Pedro V.', canal_venta: 'online' },
  { id: 'v005', cliente: 'Simona Cruz', fecha: '2026-04-25', monto: 760000, estado: 'completada', productos: 5, vendedor: 'Camila R.', canal_venta: 'tienda' },
  { id: 'v006', cliente: 'Pamela Molina', fecha: '2026-04-25', monto: 1100000, estado: 'completada', productos: 7, vendedor: 'Pedro V.', canal_venta: 'telefono' },
  { id: 'v007', cliente: 'Victoria Sepúlveda', fecha: '2026-04-24', monto: 940000, estado: 'completada', productos: 6, vendedor: 'Camila R.', canal_venta: 'tienda' },
  { id: 'v008', cliente: 'Catalina Fuenzalida', fecha: '2026-04-24', monto: 680000, estado: 'pendiente', productos: 4, vendedor: 'Pedro V.', canal_venta: 'online' },
  { id: 'v009', cliente: 'Alejandra Contreras', fecha: '2026-04-23', monto: 1380000, estado: 'completada', productos: 9, vendedor: 'Camila R.', canal_venta: 'tienda' },
  { id: 'v010', cliente: 'Patricio Bravo', fecha: '2026-04-23', monto: 560000, estado: 'completada', productos: 3, vendedor: 'Pedro V.', canal_venta: 'telefono' },
  { id: 'v011', cliente: 'Beatriz Cornejo', fecha: '2026-04-22', monto: 840000, estado: 'completada', productos: 5, vendedor: 'Camila R.', canal_venta: 'tienda' },
  { id: 'v012', cliente: 'Marisol Rojas', fecha: '2026-04-22', monto: 720000, estado: 'completada', productos: 4, vendedor: 'Pedro V.', canal_venta: 'online' },
  { id: 'v013', cliente: 'Gonzalo Vera', fecha: '2026-04-21', monto: 1560000, estado: 'completada', productos: 10, vendedor: 'Camila R.', canal_venta: 'tienda' },
  { id: 'v014', cliente: 'César Vidal', fecha: '2026-04-21', monto: 880000, estado: 'completada', productos: 6, vendedor: 'Pedro V.', canal_venta: 'tienda' },
  { id: 'v015', cliente: 'Rodrigo Opazo', fecha: '2026-04-20', monto: 640000, estado: 'completada', productos: 4, vendedor: 'Camila R.', canal_venta: 'tienda' },
  { id: 'v016', cliente: 'Claudia Vargas', fecha: '2026-04-20', monto: 980000, estado: 'completada', productos: 7, vendedor: 'Pedro V.', canal_venta: 'online' },
  { id: 'v017', cliente: 'Sofía Lagos', fecha: '2026-04-19', monto: 760000, estado: 'completada', productos: 5, vendedor: 'Camila R.', canal_venta: 'tienda' },
  { id: 'v018', cliente: 'Camila Espinoza', fecha: '2026-04-18', monto: 1120000, estado: 'completada', productos: 7, vendedor: 'Pedro V.', canal_venta: 'tienda' },
  { id: 'v019', cliente: 'Carolina Bustamante', fecha: '2026-04-18', monto: 420000, estado: 'devolucion', productos: 3, vendedor: 'Camila R.', canal_venta: 'tienda' },
  { id: 'v020', cliente: 'Luis Palma', fecha: '2026-04-17', monto: 860000, estado: 'completada', productos: 5, vendedor: 'Pedro V.', canal_venta: 'online' },
  { id: 'v021', cliente: 'Isabel Farías', fecha: '2026-04-17', monto: 680000, estado: 'completada', productos: 4, vendedor: 'Camila R.', canal_venta: 'telefono' },
  { id: 'v022', cliente: 'Valentina Torres', fecha: '2026-04-16', monto: 1240000, estado: 'completada', productos: 8, vendedor: 'Pedro V.', canal_venta: 'tienda' },
  { id: 'v023', cliente: 'Verónica Campos', fecha: '2026-04-16', monto: 740000, estado: 'completada', productos: 5, vendedor: 'Camila R.', canal_venta: 'online' },
  { id: 'v024', cliente: 'Francisca Núñez', fecha: '2026-04-15', monto: 920000, estado: 'completada', productos: 6, vendedor: 'Pedro V.', canal_venta: 'tienda' },
  { id: 'v025', cliente: 'Pilar Alvarado', fecha: '2026-04-15', monto: 580000, estado: 'completada', productos: 4, vendedor: 'Camila R.', canal_venta: 'telefono' },
  { id: 'v026', cliente: 'Natalia Caro', fecha: '2026-04-14', monto: 1060000, estado: 'completada', productos: 7, vendedor: 'Pedro V.', canal_venta: 'tienda' },
  { id: 'v027', cliente: 'Tomás Montoya', fecha: '2026-04-14', monto: 780000, estado: 'completada', productos: 5, vendedor: 'Camila R.', canal_venta: 'online' },
  { id: 'v028', cliente: 'Diego Castillo', fecha: '2026-04-13', monto: 540000, estado: 'completada', productos: 3, vendedor: 'Pedro V.', canal_venta: 'tienda' },
  { id: 'v029', cliente: 'Rodrigo Wester', fecha: '2026-04-13', monto: 1840000, estado: 'completada', productos: 11, vendedor: 'Camila R.', canal_venta: 'tienda' },
  { id: 'v030', cliente: 'Ximena Acevedo', fecha: '2026-04-12', monto: 660000, estado: 'completada', productos: 4, vendedor: 'Pedro V.', canal_venta: 'online' },
  { id: 'v031', cliente: 'Macarena Silva', fecha: '2026-04-11', monto: 820000, estado: 'completada', productos: 5, vendedor: 'Camila R.', canal_venta: 'tienda' },
  { id: 'v032', cliente: 'Esteban Gutiérrez', fecha: '2026-04-11', monto: 460000, estado: 'completada', productos: 3, vendedor: 'Pedro V.', canal_venta: 'telefono' },
  { id: 'v033', cliente: 'Daniela Ortega', fecha: '2026-04-10', monto: 1180000, estado: 'completada', productos: 7, vendedor: 'Camila R.', canal_venta: 'tienda' },
  { id: 'v034', cliente: 'Andrés Naranjo', fecha: '2026-04-10', monto: 940000, estado: 'completada', productos: 6, vendedor: 'Pedro V.', canal_venta: 'online' },
  { id: 'v035', cliente: 'Patricia Flores', fecha: '2026-04-09', monto: 720000, estado: 'completada', productos: 5, vendedor: 'Camila R.', canal_venta: 'tienda' },
  { id: 'v036', cliente: 'Camila Espinoza', fecha: '2026-04-08', monto: 1040000, estado: 'completada', productos: 7, vendedor: 'Pedro V.', canal_venta: 'tienda' },
  { id: 'v037', cliente: 'Rosa Espejo', fecha: '2026-04-08', monto: 580000, estado: 'cancelada', productos: 4, vendedor: 'Camila R.', canal_venta: 'online' },
  { id: 'v038', cliente: 'Gabriel Cisternas', fecha: '2026-04-07', monto: 860000, estado: 'completada', productos: 5, vendedor: 'Pedro V.', canal_venta: 'tienda' },
  { id: 'v039', cliente: 'Beatriz Cornejo', fecha: '2026-04-07', monto: 640000, estado: 'completada', productos: 4, vendedor: 'Camila R.', canal_venta: 'telefono' },
  { id: 'v040', cliente: 'Gonzalo Vera', fecha: '2026-04-06', monto: 1280000, estado: 'completada', productos: 8, vendedor: 'Pedro V.', canal_venta: 'tienda' },
  { id: 'v041', cliente: 'Rebeca Aliste', fecha: '2026-04-05', monto: 780000, estado: 'completada', productos: 5, vendedor: 'Camila R.', canal_venta: 'online' },
  { id: 'v042', cliente: 'Valentina Torres', fecha: '2026-04-04', monto: 1100000, estado: 'completada', productos: 7, vendedor: 'Pedro V.', canal_venta: 'tienda' },
  { id: 'v043', cliente: 'Rodrigo Opazo', fecha: '2026-04-03', monto: 620000, estado: 'completada', productos: 4, vendedor: 'Camila R.', canal_venta: 'tienda' },
  { id: 'v044', cliente: 'César Vidal', fecha: '2026-04-02', monto: 960000, estado: 'completada', productos: 6, vendedor: 'Pedro V.', canal_venta: 'tienda' },
  { id: 'v045', cliente: 'Nicole Arredondo', fecha: '2026-04-01', monto: 740000, estado: 'completada', productos: 5, vendedor: 'Camila R.', canal_venta: 'online' },
  { id: 'v046', cliente: 'Pamela Molina', fecha: '2026-03-31', monto: 1020000, estado: 'completada', productos: 6, vendedor: 'Pedro V.', canal_venta: 'telefono' },
  { id: 'v047', cliente: 'Simona Cruz', fecha: '2026-03-29', monto: 880000, estado: 'completada', productos: 5, vendedor: 'Camila R.', canal_venta: 'tienda' },
  { id: 'v048', cliente: 'Catalina Fuenzalida', fecha: '2026-03-27', monto: 760000, estado: 'completada', productos: 5, vendedor: 'Pedro V.', canal_venta: 'tienda' },
  { id: 'v049', cliente: 'Alejandra Contreras', fecha: '2026-03-25', monto: 1340000, estado: 'completada', productos: 8, vendedor: 'Camila R.', canal_venta: 'tienda' },
  { id: 'v050', cliente: 'Daniela Ortega', fecha: '2026-03-23', monto: 1080000, estado: 'completada', productos: 7, vendedor: 'Pedro V.', canal_venta: 'online' },
  { id: 'v051', cliente: 'Marisol Rojas', fecha: '2026-03-20', monto: 680000, estado: 'completada', productos: 4, vendedor: 'Camila R.', canal_venta: 'tienda' },
  { id: 'v052', cliente: 'Gonzalo Vera', fecha: '2026-03-18', monto: 1480000, estado: 'completada', productos: 9, vendedor: 'Pedro V.', canal_venta: 'tienda' },
  { id: 'v053', cliente: 'Patricia Flores', fecha: '2026-03-15', monto: 580000, estado: 'completada', productos: 4, vendedor: 'Camila R.', canal_venta: 'online' },
  { id: 'v054', cliente: 'Victoria Sepúlveda', fecha: '2026-03-12', monto: 840000, estado: 'completada', productos: 5, vendedor: 'Pedro V.', canal_venta: 'tienda' },
  { id: 'v055', cliente: 'Camila Espinoza', fecha: '2026-03-10', monto: 1160000, estado: 'completada', productos: 7, vendedor: 'Camila R.', canal_venta: 'tienda' },
]

export const movimientosCaja: MovimientoCaja[] = [
  { id: 'mc001', fecha: '2026-04-27', tipo: 'ingreso', concepto: 'Ventas del día — tienda', monto: 1600000, saldo: 18420000, categoria: 'Ventas' },
  { id: 'mc002', fecha: '2026-04-27', tipo: 'ingreso', concepto: 'Ventas online — plataforma', monto: 820000, saldo: 19240000, categoria: 'Ventas' },
  { id: 'mc003', fecha: '2026-04-26', tipo: 'ingreso', concepto: 'Ventas del día — tienda', monto: 2060000, saldo: 18420000, categoria: 'Ventas' },
  { id: 'mc004', fecha: '2026-04-26', tipo: 'egreso', concepto: 'Pago proveedores — Distribuidora Norte', monto: 3800000, saldo: 16360000, categoria: 'Proveedores' },
  { id: 'mc005', fecha: '2026-04-25', tipo: 'ingreso', concepto: 'Ventas del día — tienda', monto: 1860000, saldo: 20160000, categoria: 'Ventas' },
  { id: 'mc006', fecha: '2026-04-25', tipo: 'egreso', concepto: 'Arriendo local comercial', monto: 2800000, saldo: 18300000, categoria: 'Arriendo' },
  { id: 'mc007', fecha: '2026-04-24', tipo: 'ingreso', concepto: 'Ventas del día — tienda', monto: 1620000, saldo: 21100000, categoria: 'Ventas' },
  { id: 'mc008', fecha: '2026-04-24', tipo: 'ingreso', concepto: 'Ventas online', monto: 680000, saldo: 21780000, categoria: 'Ventas' },
  { id: 'mc009', fecha: '2026-04-23', tipo: 'ingreso', concepto: 'Ventas del día — tienda', monto: 1940000, saldo: 21100000, categoria: 'Ventas' },
  { id: 'mc010', fecha: '2026-04-23', tipo: 'egreso', concepto: 'Remuneraciones personal', monto: 3400000, saldo: 19160000, categoria: 'RRHH' },
  { id: 'mc011', fecha: '2026-04-22', tipo: 'ingreso', concepto: 'Ventas del día — tienda', monto: 1560000, saldo: 22560000, categoria: 'Ventas' },
  { id: 'mc012', fecha: '2026-04-22', tipo: 'egreso', concepto: 'Publicidad Meta Ads', monto: 420000, saldo: 22140000, categoria: 'Marketing' },
  { id: 'mc013', fecha: '2026-04-21', tipo: 'ingreso', concepto: 'Ventas del día — tienda', monto: 2440000, saldo: 22560000, categoria: 'Ventas' },
  { id: 'mc014', fecha: '2026-04-21', tipo: 'egreso', concepto: 'Compra inventario — colección primavera', monto: 5600000, saldo: 20120000, categoria: 'Inventario' },
  { id: 'mc015', fecha: '2026-04-20', tipo: 'ingreso', concepto: 'Ventas del día — tienda', monto: 1300000, saldo: 25720000, categoria: 'Ventas' },
  { id: 'mc016', fecha: '2026-04-20', tipo: 'ingreso', concepto: 'Ventas online', monto: 980000, saldo: 26700000, categoria: 'Ventas' },
  { id: 'mc017', fecha: '2026-04-19', tipo: 'ingreso', concepto: 'Ventas del día — tienda', monto: 1840000, saldo: 25720000, categoria: 'Ventas' },
  { id: 'mc018', fecha: '2026-04-18', tipo: 'ingreso', concepto: 'Ventas del día — tienda', monto: 1420000, saldo: 23880000, categoria: 'Ventas' },
  { id: 'mc019', fecha: '2026-04-18', tipo: 'egreso', concepto: 'Pago servicios básicos', monto: 380000, saldo: 23500000, categoria: 'Gastos fijos' },
  { id: 'mc020', fecha: '2026-04-17', tipo: 'ingreso', concepto: 'Ventas del día — tienda', monto: 1540000, saldo: 23880000, categoria: 'Ventas' },
  { id: 'mc021', fecha: '2026-04-16', tipo: 'ingreso', concepto: 'Ventas del día — tienda', monto: 1980000, saldo: 22340000, categoria: 'Ventas' },
  { id: 'mc022', fecha: '2026-04-16', tipo: 'egreso', concepto: 'Google Ads — campaña abril', monto: 280000, saldo: 22060000, categoria: 'Marketing' },
  { id: 'mc023', fecha: '2026-04-15', tipo: 'ingreso', concepto: 'Ventas del día — tienda', monto: 1500000, saldo: 22340000, categoria: 'Ventas' },
  { id: 'mc024', fecha: '2026-04-14', tipo: 'ingreso', concepto: 'Ventas del día — tienda', monto: 1840000, saldo: 20840000, categoria: 'Ventas' },
  { id: 'mc025', fecha: '2026-04-13', tipo: 'ingreso', concepto: 'Ventas del día — tienda', monto: 2120000, saldo: 19000000, categoria: 'Ventas' },
  { id: 'mc026', fecha: '2026-04-12', tipo: 'egreso', concepto: 'Pago proveedores — Textiles Sur', monto: 2900000, saldo: 16880000, categoria: 'Proveedores' },
  { id: 'mc027', fecha: '2026-04-11', tipo: 'ingreso', concepto: 'Ventas del día — tienda', monto: 1280000, saldo: 19780000, categoria: 'Ventas' },
  { id: 'mc028', fecha: '2026-04-10', tipo: 'ingreso', concepto: 'Ventas del día — tienda', monto: 2120000, saldo: 18500000, categoria: 'Ventas' },
  { id: 'mc029', fecha: '2026-04-09', tipo: 'egreso', concepto: 'Mantenimiento local', monto: 640000, saldo: 16380000, categoria: 'Gastos fijos' },
  { id: 'mc030', fecha: '2026-04-08', tipo: 'ingreso', concepto: 'Ventas del día — tienda', monto: 1620000, saldo: 17020000, categoria: 'Ventas' },
]

export const marketingData = [
  { mes: 'May 25', instagram: 280000, google: 150000, tiktok: 200000, meta: 180000 },
  { mes: 'Jun 25', instagram: 320000, google: 180000, tiktok: 240000, meta: 210000 },
  { mes: 'Jul 25', instagram: 290000, google: 160000, tiktok: 220000, meta: 195000 },
  { mes: 'Ago 25', instagram: 350000, google: 200000, tiktok: 280000, meta: 230000 },
  { mes: 'Sep 25', instagram: 380000, google: 220000, tiktok: 300000, meta: 260000 },
  { mes: 'Oct 25', instagram: 420000, google: 240000, tiktok: 340000, meta: 290000 },
  { mes: 'Nov 25', instagram: 500000, google: 280000, tiktok: 400000, meta: 350000 },
  { mes: 'Dic 25', instagram: 580000, google: 320000, tiktok: 460000, meta: 400000 },
  { mes: 'Ene 26', instagram: 380000, google: 200000, tiktok: 300000, meta: 260000 },
  { mes: 'Feb 26', instagram: 420000, google: 220000, tiktok: 340000, meta: 290000 },
  { mes: 'Mar 26', instagram: 460000, google: 250000, tiktok: 380000, meta: 320000 },
  { mes: 'Abr 26', instagram: 500000, google: 280000, tiktok: 420000, meta: 350000 },
]

export const revenueData = [
  { mes: 'May 25', ingresos: 28400000, costos: 19900000 },
  { mes: 'Jun 25', ingresos: 31600000, costos: 22100000 },
  { mes: 'Jul 25', ingresos: 29800000, costos: 20900000 },
  { mes: 'Ago 25', ingresos: 34200000, costos: 24000000 },
  { mes: 'Sep 25', ingresos: 32600000, costos: 22800000 },
  { mes: 'Oct 25', ingresos: 37800000, costos: 26500000 },
  { mes: 'Nov 25', ingresos: 44600000, costos: 31200000 },
  { mes: 'Dic 25', ingresos: 52400000, costos: 36700000 },
  { mes: 'Ene 26', ingresos: 31200000, costos: 21800000 },
  { mes: 'Feb 26', ingresos: 34800000, costos: 24400000 },
  { mes: 'Mar 26', ingresos: 38600000, costos: 27000000 },
  { mes: 'Abr 26', ingresos: 42200000, costos: 29600000 },
]

export const kpis = {
  ingresos_mes: 42200000,
  ventas_mes: 55,
  leads_calificados: 26,
  ticket_promedio: 892000,
  nps: 74,
  margen_mes: 12600000,
  conversion_online: 4.2,
  saldo_caja: 18420000,
}

export const agentResponses = {
  dashboard: `**Análisis de operación — Abril 2026**

Las ventas del mes suman $42.2M con un margen de $12.6M (30%). El saldo de caja disponible asciende a $18.4M. Ticket promedio en $892K, estable con respecto al trimestre anterior.

**Oportunidades identificadas:**
1. Las clientas VIP (Espinoza, Torres, Ortega, Vera, Cruz, Sepúlveda, Fuenzalida) generan el 44% de los ingresos. Un programa de fidelización con descuento exclusivo podría aumentar frecuencia de compra un 20%.
2. TikTok muestra la mejor relación costo/lead del trimestre. Aumentar presupuesto a $600K mensuales y testear formatos de producto en uso.
3. Las ventas online representan solo el 22% del total. Hay oportunidad de escalar con catálogo optimizado y campañas de remarketing.

**Riesgos:**
- Carolina Herrera, Mariana Ibarra y Lucía Ibáñez llevan más de 60 días sin comprar. Activar campaña de reenganche.
- El egreso de inventario de $5.6M del 21 de abril reduce la liquidez. Monitorear flujo para el próximo pago de proveedores.`,

  leads: `**Pipeline de Ventas — Análisis de Leads**

El pipeline activo contiene 60 leads con un valor estimado de $146M. Los leads en etapa avanzada (reunión + propuesta) suman $58M.

**Leads prioritarios esta semana:**
1. **Stefan Wulf** (Wulf Architecture) — score 94, reunión agendada por $5.8M. Preparar propuesta personalizada antes del jueves.
2. **María Paz Núñez** (Núñez Terapias) — score 95, propuesta por $5.2M enviada hace 4 días. Hacer seguimiento hoy.
3. **Germán Oyarzún** (Oyarzún Catering) — score 91, propuesta $4.4M. Buen candidato para cierre esta semana.

**Canal más rentable:** Referidos tienen tasa de cierre del 78% y ticket 60% mayor al promedio. Priorizar activaciones de referidos entre clientes VIP.
**TikTok:** 8 leads en el trimestre — 3 ya calificados. Continuar inversión y medir conversión a venta.`,
}
