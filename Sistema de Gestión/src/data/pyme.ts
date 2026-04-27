// Servicios Rápidos Ltda. — empresa de mantención y reparación industrial
// Equipo: 4 técnicos, operación en Santiago RM y alrededores

export interface Cliente {
  id: string; nombre: string; empresa: string; email: string; telefono: string;
  sector: string; estado: 'activo' | 'inactivo' | 'vip'; servicios: number;
  ingresos_total: number; ultimo_contacto: string; ciudad: string;
}

export interface Servicio {
  id: string; cliente: string; empresa: string; tipo_servicio: string;
  fecha: string; monto: number;
  estado: 'pendiente' | 'en_ejecucion' | 'completado' | 'cancelado';
  tecnico: string; duracion_hrs: number;
}

export interface AgendaItem {
  id: string; fecha: string; hora: string; cliente: string; empresa: string;
  tipo_servicio: string; tecnico: string;
  estado: 'confirmado' | 'tentativo' | 'cancelado';
  duracion_hrs: number; direccion: string;
}

export interface MovimientoCaja {
  id: string; fecha: string; tipo: 'ingreso' | 'egreso';
  concepto: string; monto: number; saldo: number; categoria: string;
}

export const clientes: Cliente[] = [
  { id: 'c01', nombre: 'Rodrigo Muñoz', empresa: 'Planta Industrial Norte', email: 'r.munoz@plantan.cl', telefono: '+56 9 8811 2233', sector: 'Industrial', estado: 'vip', servicios: 24, ingresos_total: 9800000, ultimo_contacto: '2026-04-25', ciudad: 'Quilicura' },
  { id: 'c02', nombre: 'Patricia Fuentes', empresa: 'Clínica Santa Rosa', email: 'p.fuentes@clinicasr.cl', telefono: '+56 9 7722 3344', sector: 'Salud', estado: 'vip', servicios: 31, ingresos_total: 12400000, ultimo_contacto: '2026-04-22', ciudad: 'Santiago' },
  { id: 'c03', nombre: 'Carlos Herrera', empresa: 'Bodega Central SpA', email: 'c.herrera@bodegacentral.cl', telefono: '+56 9 6633 4455', sector: 'Logística', estado: 'activo', servicios: 12, ingresos_total: 4800000, ultimo_contacto: '2026-04-15', ciudad: 'San Bernardo' },
  { id: 'c04', nombre: 'Ana Soto', empresa: 'Restaurante El Molo', email: 'a.soto@elmolo.cl', telefono: '+56 9 5544 5566', sector: 'Gastronomía', estado: 'activo', servicios: 18, ingresos_total: 6200000, ultimo_contacto: '2026-04-18', ciudad: 'Providencia' },
  { id: 'c05', nombre: 'Fernando Torres', empresa: 'Taller Torres & Hnos.', email: 'f.torres@tallertorres.cl', telefono: '+56 9 4455 6677', sector: 'Automotriz', estado: 'activo', servicios: 9, ingresos_total: 3100000, ultimo_contacto: '2026-04-10', ciudad: 'Maipú' },
  { id: 'c06', nombre: 'Marcela Vargas', empresa: 'Supermercado Vargas', email: 'm.vargas@supervargas.cl', telefono: '+56 9 3366 7788', sector: 'Retail', estado: 'vip', servicios: 28, ingresos_total: 11200000, ultimo_contacto: '2026-04-27', ciudad: 'La Florida' },
  { id: 'c07', nombre: 'Tomás Ibáñez', empresa: 'Hotel Las Torres', email: 't.ibanez@hotellastorres.cl', telefono: '+56 9 9977 8899', sector: 'Hotelería', estado: 'activo', servicios: 15, ingresos_total: 5800000, ultimo_contacto: '2026-04-20', ciudad: 'Vitacura' },
  { id: 'c08', nombre: 'Claudia Reyes', empresa: 'Cowork Reyes SpA', email: 'c.reyes@coworkreyes.cl', telefono: '+56 9 8888 9900', sector: 'Servicios', estado: 'activo', servicios: 7, ingresos_total: 2400000, ultimo_contacto: '2026-04-12', ciudad: 'Las Condes' },
  { id: 'c09', nombre: 'Sebastián Pizarro', empresa: 'Frigorífico Del Sur', email: 's.pizarro@frigosur.cl', telefono: '+56 9 7799 0011', sector: 'Alimentación', estado: 'vip', servicios: 36, ingresos_total: 14600000, ultimo_contacto: '2026-04-24', ciudad: 'Pudahuel' },
  { id: 'c10', nombre: 'Gabriela Molina', empresa: 'Centro Médico Molina', email: 'g.molina@centromolina.cl', telefono: '+56 9 6600 1122', sector: 'Salud', estado: 'activo', servicios: 20, ingresos_total: 7300000, ultimo_contacto: '2026-04-16', ciudad: 'Ñuñoa' },
  { id: 'c11', nombre: 'Ricardo Araya', empresa: 'Industrias Araya Ltda.', email: 'r.araya@industriasaraya.cl', telefono: '+56 9 5511 2233', sector: 'Industrial', estado: 'activo', servicios: 14, ingresos_total: 5100000, ultimo_contacto: '2026-04-08', ciudad: 'Renca' },
  { id: 'c12', nombre: 'Pilar Castillo', empresa: 'Farmacia Castillo', email: 'p.castillo@farmcastillo.cl', telefono: '+56 9 4422 3344', sector: 'Salud', estado: 'activo', servicios: 8, ingresos_total: 2900000, ultimo_contacto: '2026-04-05', ciudad: 'Santiago' },
  { id: 'c13', nombre: 'Jorge Espinoza', empresa: 'Constructora Espinoza', email: 'j.espinoza@constructoraespinoza.cl', telefono: '+56 9 3333 4455', sector: 'Construcción', estado: 'activo', servicios: 11, ingresos_total: 4200000, ultimo_contacto: '2026-03-29', ciudad: 'Buin' },
  { id: 'c14', nombre: 'Natalia Ruiz', empresa: 'Escuela Ruiz Industrial', email: 'n.ruiz@escuelaruiz.cl', telefono: '+56 9 9944 5566', sector: 'Educación', estado: 'activo', servicios: 6, ingresos_total: 2100000, ultimo_contacto: '2026-03-22', ciudad: 'Puente Alto' },
  { id: 'c15', nombre: 'Álvaro Morales', empresa: 'Morales Transporte SpA', email: 'a.morales@moralestransporte.cl', telefono: '+56 9 8855 6677', sector: 'Transporte', estado: 'activo', servicios: 19, ingresos_total: 6800000, ultimo_contacto: '2026-04-21', ciudad: 'Cerrillos' },
  { id: 'c16', nombre: 'Isabel Vega', empresa: 'Instituto Vega', email: 'i.vega@institutovega.cl', telefono: '+56 9 7766 7788', sector: 'Educación', estado: 'inactivo', servicios: 3, ingresos_total: 980000, ultimo_contacto: '2026-01-15', ciudad: 'Santiago' },
  { id: 'c17', nombre: 'Manuel Rojas', empresa: 'Rojas Alimentos', email: 'm.rojas@rojasalimentos.cl', telefono: '+56 9 6677 8899', sector: 'Alimentación', estado: 'activo', servicios: 16, ingresos_total: 5900000, ultimo_contacto: '2026-04-19', ciudad: 'Maipú' },
  { id: 'c18', nombre: 'Constanza Meza', empresa: 'Empresa Meza & Cía.', email: 'c.meza@mezacia.cl', telefono: '+56 9 5588 9900', sector: 'Comercio', estado: 'activo', servicios: 10, ingresos_total: 3600000, ultimo_contacto: '2026-04-13', ciudad: 'Vitacura' },
  { id: 'c19', nombre: 'Pablo Silva', empresa: 'Silva Logística', email: 'p.silva@silvalog.cl', telefono: '+56 9 4499 0011', sector: 'Logística', estado: 'vip', servicios: 22, ingresos_total: 8900000, ultimo_contacto: '2026-04-26', ciudad: 'Quilicura' },
  { id: 'c20', nombre: 'Verónica Campos', empresa: 'Colegio Campos', email: 'v.campos@colegiocampos.cl', telefono: '+56 9 3300 1122', sector: 'Educación', estado: 'activo', servicios: 13, ingresos_total: 4700000, ultimo_contacto: '2026-04-11', ciudad: 'La Reina' },
  { id: 'c21', nombre: 'Luis Contreras', empresa: 'Contreras Industrias', email: 'l.contreras@contrind.cl', telefono: '+56 9 9911 2233', sector: 'Industrial', estado: 'activo', servicios: 17, ingresos_total: 6300000, ultimo_contacto: '2026-04-17', ciudad: 'Pudahuel' },
  { id: 'c22', nombre: 'Teresa Garrido', empresa: 'Garrido Gastronomía', email: 't.garrido@garridogastro.cl', telefono: '+56 9 8822 3344', sector: 'Gastronomía', estado: 'activo', servicios: 8, ingresos_total: 2800000, ultimo_contacto: '2026-04-07', ciudad: 'Ñuñoa' },
  { id: 'c23', nombre: 'Andrés Peña', empresa: 'Peña Construcciones', email: 'a.pena@penaconstruc.cl', telefono: '+56 9 7733 4455', sector: 'Construcción', estado: 'inactivo', servicios: 4, ingresos_total: 1400000, ultimo_contacto: '2026-01-08', ciudad: 'Melipilla' },
  { id: 'c24', nombre: 'Carmen Flores', empresa: 'Flores Hoteles SpA', email: 'c.flores@floreshoteles.cl', telefono: '+56 9 6644 5566', sector: 'Hotelería', estado: 'activo', servicios: 21, ingresos_total: 7800000, ultimo_contacto: '2026-04-23', ciudad: 'Las Condes' },
  { id: 'c25', nombre: 'Eduardo Núñez', empresa: 'Núñez Retail', email: 'e.nunez@nunezretail.cl', telefono: '+56 9 5555 6677', sector: 'Retail', estado: 'activo', servicios: 12, ingresos_total: 4300000, ultimo_contacto: '2026-04-14', ciudad: 'Maipú' },
]

const TECNICOS = ['Roberto Fuentes', 'Claudia Pizarro', 'Marcos Vera', 'Felipe Torres']

export const servicios: Servicio[] = [
  { id: 's001', cliente: 'Rodrigo Muñoz', empresa: 'Planta Industrial Norte', tipo_servicio: 'Mantención preventiva de compresores', fecha: '2026-04-25', monto: 480000, estado: 'completado', tecnico: TECNICOS[0], duracion_hrs: 6 },
  { id: 's002', cliente: 'Patricia Fuentes', empresa: 'Clínica Santa Rosa', tipo_servicio: 'Revisión sistema climatización', fecha: '2026-04-24', monto: 320000, estado: 'completado', tecnico: TECNICOS[1], duracion_hrs: 4 },
  { id: 's003', cliente: 'Sebastián Pizarro', empresa: 'Frigorífico Del Sur', tipo_servicio: 'Reparación cámara frigorífica N°2', fecha: '2026-04-23', monto: 890000, estado: 'completado', tecnico: TECNICOS[2], duracion_hrs: 10 },
  { id: 's004', cliente: 'Marcela Vargas', empresa: 'Supermercado Vargas', tipo_servicio: 'Mantención equipos refrigeración', fecha: '2026-04-23', monto: 560000, estado: 'completado', tecnico: TECNICOS[3], duracion_hrs: 7 },
  { id: 's005', cliente: 'Pablo Silva', empresa: 'Silva Logística', tipo_servicio: 'Inspección técnica instalación eléctrica', fecha: '2026-04-22', monto: 280000, estado: 'completado', tecnico: TECNICOS[0], duracion_hrs: 3 },
  { id: 's006', cliente: 'Tomás Ibáñez', empresa: 'Hotel Las Torres', tipo_servicio: 'Reparación sistema calefacción piso 3', fecha: '2026-04-22', monto: 420000, estado: 'completado', tecnico: TECNICOS[1], duracion_hrs: 5 },
  { id: 's007', cliente: 'Carlos Herrera', empresa: 'Bodega Central SpA', tipo_servicio: 'Mantención preventiva ventilación', fecha: '2026-04-21', monto: 350000, estado: 'completado', tecnico: TECNICOS[2], duracion_hrs: 4 },
  { id: 's008', cliente: 'Gabriela Molina', empresa: 'Centro Médico Molina', tipo_servicio: 'Revisión tablero eléctrico principal', fecha: '2026-04-21', monto: 290000, estado: 'completado', tecnico: TECNICOS[3], duracion_hrs: 3.5 },
  { id: 's009', cliente: 'Ana Soto', empresa: 'Restaurante El Molo', tipo_servicio: 'Reparación refrigerador industrial', fecha: '2026-04-20', monto: 540000, estado: 'completado', tecnico: TECNICOS[0], duracion_hrs: 6 },
  { id: 's010', cliente: 'Ricardo Araya', empresa: 'Industrias Araya Ltda.', tipo_servicio: 'Mantención compresor principal', fecha: '2026-04-19', monto: 680000, estado: 'completado', tecnico: TECNICOS[1], duracion_hrs: 8 },
  { id: 's011', cliente: 'Luis Contreras', empresa: 'Contreras Industrias', tipo_servicio: 'Instalación sistema UPS', fecha: '2026-04-18', monto: 1200000, estado: 'completado', tecnico: TECNICOS[2], duracion_hrs: 12 },
  { id: 's012', cliente: 'Carmen Flores', empresa: 'Flores Hoteles SpA', tipo_servicio: 'Mantención anual climatización', fecha: '2026-04-17', monto: 780000, estado: 'completado', tecnico: TECNICOS[3], duracion_hrs: 9 },
  { id: 's013', cliente: 'Álvaro Morales', empresa: 'Morales Transporte SpA', tipo_servicio: 'Revisión instalación eléctrica galpón', fecha: '2026-04-16', monto: 360000, estado: 'completado', tecnico: TECNICOS[0], duracion_hrs: 4 },
  { id: 's014', cliente: 'Manuel Rojas', empresa: 'Rojas Alimentos', tipo_servicio: 'Reparación túnel de congelamiento', fecha: '2026-04-15', monto: 920000, estado: 'completado', tecnico: TECNICOS[1], duracion_hrs: 11 },
  { id: 's015', cliente: 'Rodrigo Muñoz', empresa: 'Planta Industrial Norte', tipo_servicio: 'Revisión sistema extracción', fecha: '2026-04-14', monto: 310000, estado: 'completado', tecnico: TECNICOS[2], duracion_hrs: 3.5 },
  { id: 's016', cliente: 'Verónica Campos', empresa: 'Colegio Campos', tipo_servicio: 'Mantención calefacción salas', fecha: '2026-04-11', monto: 580000, estado: 'completado', tecnico: TECNICOS[3], duracion_hrs: 7 },
  { id: 's017', cliente: 'Patricia Fuentes', empresa: 'Clínica Santa Rosa', tipo_servicio: 'Inspección sistemas de respaldo', fecha: '2026-04-10', monto: 420000, estado: 'completado', tecnico: TECNICOS[0], duracion_hrs: 5 },
  { id: 's018', cliente: 'Marcela Vargas', empresa: 'Supermercado Vargas', tipo_servicio: 'Reparación urgente vitrina refrigerada', fecha: '2026-04-09', monto: 740000, estado: 'completado', tecnico: TECNICOS[1], duracion_hrs: 8 },
  { id: 's019', cliente: 'Constanza Meza', empresa: 'Empresa Meza & Cía.', tipo_servicio: 'Instalación sistema climatización oficinas', fecha: '2026-04-08', monto: 1650000, estado: 'completado', tecnico: TECNICOS[2], duracion_hrs: 16 },
  { id: 's020', cliente: 'Sebastián Pizarro', empresa: 'Frigorífico Del Sur', tipo_servicio: 'Mantención mensual equipos fríos', fecha: '2026-04-07', monto: 480000, estado: 'completado', tecnico: TECNICOS[3], duracion_hrs: 6 },
  { id: 's021', cliente: 'Eduardo Núñez', empresa: 'Núñez Retail', tipo_servicio: 'Revisión tablero eléctrico', fecha: '2026-04-05', monto: 280000, estado: 'completado', tecnico: TECNICOS[0], duracion_hrs: 3 },
  { id: 's022', cliente: 'Ana Soto', empresa: 'Restaurante El Molo', tipo_servicio: 'Mantención campana extractora', fecha: '2026-04-04', monto: 320000, estado: 'completado', tecnico: TECNICOS[1], duracion_hrs: 4 },
  { id: 's023', cliente: 'Fernando Torres', empresa: 'Taller Torres & Hnos.', tipo_servicio: 'Instalación extractor industrial', fecha: '2026-04-03', monto: 890000, estado: 'completado', tecnico: TECNICOS[2], duracion_hrs: 10 },
  { id: 's024', cliente: 'Pablo Silva', empresa: 'Silva Logística', tipo_servicio: 'Mantención equipos climatización', fecha: '2026-04-02', monto: 560000, estado: 'completado', tecnico: TECNICOS[3], duracion_hrs: 7 },
  { id: 's025', cliente: 'Carlos Herrera', empresa: 'Bodega Central SpA', tipo_servicio: 'Reparación sistema ventilación', fecha: '2026-04-01', monto: 670000, estado: 'completado', tecnico: TECNICOS[0], duracion_hrs: 8 },
  { id: 's026', cliente: 'Rodrigo Muñoz', empresa: 'Planta Industrial Norte', tipo_servicio: 'Inspección anual instalaciones', fecha: '2026-03-28', monto: 980000, estado: 'completado', tecnico: TECNICOS[1], duracion_hrs: 12 },
  { id: 's027', cliente: 'Pilar Castillo', empresa: 'Farmacia Castillo', tipo_servicio: 'Mantención climatización local', fecha: '2026-03-25', monto: 290000, estado: 'completado', tecnico: TECNICOS[2], duracion_hrs: 3.5 },
  { id: 's028', cliente: 'Gabriela Molina', empresa: 'Centro Médico Molina', tipo_servicio: 'Instalación aire acondicionado pabellón', fecha: '2026-03-22', monto: 2100000, estado: 'completado', tecnico: TECNICOS[3], duracion_hrs: 20 },
  { id: 's029', cliente: 'Luis Contreras', empresa: 'Contreras Industrias', tipo_servicio: 'Mantención compresor secundario', fecha: '2026-03-19', monto: 540000, estado: 'completado', tecnico: TECNICOS[0], duracion_hrs: 6 },
  { id: 's030', cliente: 'Tomás Ibáñez', empresa: 'Hotel Las Torres', tipo_servicio: 'Reparación calderas piso 1-2', fecha: '2026-03-15', monto: 1380000, estado: 'completado', tecnico: TECNICOS[1], duracion_hrs: 14 },
  // Abril en curso
  { id: 's031', cliente: 'Patricia Fuentes', empresa: 'Clínica Santa Rosa', tipo_servicio: 'Mantención UPS sala servidores', fecha: '2026-04-27', monto: 480000, estado: 'en_ejecucion', tecnico: TECNICOS[2], duracion_hrs: 6 },
  { id: 's032', cliente: 'Sebastián Pizarro', empresa: 'Frigorífico Del Sur', tipo_servicio: 'Revisión urgente cámara N°1', fecha: '2026-04-27', monto: 780000, estado: 'en_ejecucion', tecnico: TECNICOS[3], duracion_hrs: 9 },
  { id: 's033', cliente: 'Ricardo Araya', empresa: 'Industrias Araya Ltda.', tipo_servicio: 'Mantención tableros eléctricos', fecha: '2026-04-28', monto: 650000, estado: 'pendiente', tecnico: TECNICOS[0], duracion_hrs: 8 },
  { id: 's034', cliente: 'Carmen Flores', empresa: 'Flores Hoteles SpA', tipo_servicio: 'Revisión sistema agua caliente', fecha: '2026-04-28', monto: 420000, estado: 'pendiente', tecnico: TECNICOS[1], duracion_hrs: 5 },
  { id: 's035', cliente: 'Marcela Vargas', empresa: 'Supermercado Vargas', tipo_servicio: 'Mantención preventiva mayo', fecha: '2026-04-29', monto: 560000, estado: 'pendiente', tecnico: TECNICOS[2], duracion_hrs: 7 },
  { id: 's036', cliente: 'Rodrigo Muñoz', empresa: 'Planta Industrial Norte', tipo_servicio: 'Cambio filtros sistema extracción', fecha: '2026-04-29', monto: 340000, estado: 'pendiente', tecnico: TECNICOS[3], duracion_hrs: 4 },
  { id: 's037', cliente: 'Pablo Silva', empresa: 'Silva Logística', tipo_servicio: 'Inspección instalación eléctrica bodega nueva', fecha: '2026-04-30', monto: 680000, estado: 'pendiente', tecnico: TECNICOS[0], duracion_hrs: 8 },
  { id: 's038', cliente: 'Gabriela Molina', empresa: 'Centro Médico Molina', tipo_servicio: 'Mantención equipos climatización consultas', fecha: '2026-04-30', monto: 490000, estado: 'pendiente', tecnico: TECNICOS[1], duracion_hrs: 6 },
  // Cancelados
  { id: 's039', cliente: 'Andrés Peña', empresa: 'Peña Construcciones', tipo_servicio: 'Instalación extractor obra', fecha: '2026-04-18', monto: 380000, estado: 'cancelado', tecnico: TECNICOS[2], duracion_hrs: 4 },
  { id: 's040', cliente: 'Isabel Vega', empresa: 'Instituto Vega', tipo_servicio: 'Revisión calefacción aulas', fecha: '2026-04-10', monto: 290000, estado: 'cancelado', tecnico: TECNICOS[3], duracion_hrs: 3.5 },
]

export const agenda: AgendaItem[] = [
  { id: 'ag01', fecha: '2026-04-28', hora: '08:30', cliente: 'Ricardo Araya', empresa: 'Industrias Araya Ltda.', tipo_servicio: 'Mantención tableros eléctricos', tecnico: TECNICOS[0], estado: 'confirmado', duracion_hrs: 8, direccion: 'Av. Las Industrias 1240, Renca' },
  { id: 'ag02', fecha: '2026-04-28', hora: '09:00', cliente: 'Carmen Flores', empresa: 'Flores Hoteles SpA', tipo_servicio: 'Revisión sistema agua caliente', tecnico: TECNICOS[1], estado: 'confirmado', duracion_hrs: 5, direccion: 'El Golf 150, Las Condes' },
  { id: 'ag03', fecha: '2026-04-28', hora: '10:00', cliente: 'Claudia Reyes', empresa: 'Cowork Reyes SpA', tipo_servicio: 'Mantención aire acondicionado oficinas', tecnico: TECNICOS[2], estado: 'tentativo', duracion_hrs: 3, direccion: 'Apoquindo 3600, Las Condes' },
  { id: 'ag04', fecha: '2026-04-29', hora: '08:00', cliente: 'Marcela Vargas', empresa: 'Supermercado Vargas', tipo_servicio: 'Mantención preventiva equipos refrigeración', tecnico: TECNICOS[2], estado: 'confirmado', duracion_hrs: 7, direccion: 'Tobalaba 4200, La Florida' },
  { id: 'ag05', fecha: '2026-04-29', hora: '09:30', cliente: 'Rodrigo Muñoz', empresa: 'Planta Industrial Norte', tipo_servicio: 'Cambio filtros sistema extracción', tecnico: TECNICOS[3], estado: 'confirmado', duracion_hrs: 4, direccion: 'Av. Principal 890, Quilicura' },
  { id: 'ag06', fecha: '2026-04-30', hora: '08:30', cliente: 'Pablo Silva', empresa: 'Silva Logística', tipo_servicio: 'Inspección eléctrica bodega nueva', tecnico: TECNICOS[0], estado: 'confirmado', duracion_hrs: 8, direccion: 'Ruta 78 Km 12, Cerrillos' },
  { id: 'ag07', fecha: '2026-04-30', hora: '09:00', cliente: 'Gabriela Molina', empresa: 'Centro Médico Molina', tipo_servicio: 'Mantención climatización consultas', tecnico: TECNICOS[1], estado: 'confirmado', duracion_hrs: 6, direccion: 'Irarrázaval 2900, Ñuñoa' },
  { id: 'ag08', fecha: '2026-05-02', hora: '08:00', cliente: 'Luis Contreras', empresa: 'Contreras Industrias', tipo_servicio: 'Mantención preventiva mensual', tecnico: TECNICOS[2], estado: 'confirmado', duracion_hrs: 6, direccion: 'Av. Pudahuel 3400, Pudahuel' },
  { id: 'ag09', fecha: '2026-05-02', hora: '10:00', cliente: 'Tomás Ibáñez', empresa: 'Hotel Las Torres', tipo_servicio: 'Revisión sistema calefacción', tecnico: TECNICOS[3], estado: 'tentativo', duracion_hrs: 4, direccion: 'Presidente Riesco 5330, Las Condes' },
  { id: 'ag10', fecha: '2026-05-04', hora: '08:30', cliente: 'Sebastián Pizarro', empresa: 'Frigorífico Del Sur', tipo_servicio: 'Mantención mensual cámaras frías', tecnico: TECNICOS[0], estado: 'confirmado', duracion_hrs: 8, direccion: 'Av. Lo Boza 160, Pudahuel' },
  { id: 'ag11', fecha: '2026-05-05', hora: '09:00', cliente: 'Ana Soto', empresa: 'Restaurante El Molo', tipo_servicio: 'Revisión campana y extractores', tecnico: TECNICOS[1], estado: 'confirmado', duracion_hrs: 3, direccion: 'Av. Italia 1200, Providencia' },
  { id: 'ag12', fecha: '2026-05-06', hora: '08:00', cliente: 'Patricia Fuentes', empresa: 'Clínica Santa Rosa', tipo_servicio: 'Inspección general sistemas', tecnico: TECNICOS[2], estado: 'tentativo', duracion_hrs: 5, direccion: 'Av. Matta 1350, Santiago' },
  { id: 'ag13', fecha: '2026-05-07', hora: '09:30', cliente: 'Carlos Herrera', empresa: 'Bodega Central SpA', tipo_servicio: 'Mantención ventilación bodegas', tecnico: TECNICOS[3], estado: 'confirmado', duracion_hrs: 5, direccion: 'Camino a Melipilla 8200, San Bernardo' },
  { id: 'ag14', fecha: '2026-05-08', hora: '08:00', cliente: 'Manuel Rojas', empresa: 'Rojas Alimentos', tipo_servicio: 'Mantención preventiva mensual', tecnico: TECNICOS[0], estado: 'confirmado', duracion_hrs: 7, direccion: 'Av. Portales 3490, Maipú' },
  { id: 'ag15', fecha: '2026-05-09', hora: '09:00', cliente: 'Verónica Campos', empresa: 'Colegio Campos', tipo_servicio: 'Preparación calefacción invierno', tecnico: TECNICOS[1], estado: 'confirmado', duracion_hrs: 8, direccion: 'Av. Larraín 5600, La Reina' },
]

export const movimientosCaja: MovimientoCaja[] = [
  { id: 'm01', fecha: '2026-04-27', tipo: 'ingreso', concepto: 'Pago servicio — Planta Industrial Norte', monto: 480000, saldo: 18420000, categoria: 'Cobro servicio' },
  { id: 'm02', fecha: '2026-04-25', tipo: 'ingreso', concepto: 'Pago servicio — Clínica Santa Rosa', monto: 320000, saldo: 17940000, categoria: 'Cobro servicio' },
  { id: 'm03', fecha: '2026-04-24', tipo: 'egreso', concepto: 'Repuestos y materiales abril', monto: 680000, saldo: 17620000, categoria: 'Materiales' },
  { id: 'm04', fecha: '2026-04-23', tipo: 'ingreso', concepto: 'Pago servicio — Frigorífico Del Sur', monto: 890000, saldo: 18300000, categoria: 'Cobro servicio' },
  { id: 'm05', fecha: '2026-04-22', tipo: 'ingreso', concepto: 'Pago servicio — Supermercado Vargas', monto: 560000, saldo: 17410000, categoria: 'Cobro servicio' },
  { id: 'm06', fecha: '2026-04-20', tipo: 'egreso', concepto: 'Sueldos técnicos — quincena', monto: 3200000, saldo: 16850000, categoria: 'Remuneraciones' },
  { id: 'm07', fecha: '2026-04-19', tipo: 'ingreso', concepto: 'Pago servicio — Silva Logística', monto: 280000, saldo: 20050000, categoria: 'Cobro servicio' },
  { id: 'm08', fecha: '2026-04-18', tipo: 'ingreso', concepto: 'Pago servicio — Hotel Las Torres', monto: 420000, saldo: 19770000, categoria: 'Cobro servicio' },
  { id: 'm09', fecha: '2026-04-17', tipo: 'egreso', concepto: 'Combustible vehículos técnicos', monto: 180000, saldo: 19350000, categoria: 'Operación' },
  { id: 'm10', fecha: '2026-04-16', tipo: 'ingreso', concepto: 'Pago servicio — Bodega Central SpA', monto: 350000, saldo: 19530000, categoria: 'Cobro servicio' },
  { id: 'm11', fecha: '2026-04-15', tipo: 'egreso', concepto: 'Arriendo bodega materiales', monto: 480000, saldo: 19180000, categoria: 'Arriendo' },
  { id: 'm12', fecha: '2026-04-14', tipo: 'ingreso', concepto: 'Pago servicio — Centro Médico Molina', monto: 290000, saldo: 19660000, categoria: 'Cobro servicio' },
  { id: 'm13', fecha: '2026-04-12', tipo: 'ingreso', concepto: 'Abono parcial — Industrias Araya (s/o pendiente)', monto: 500000, saldo: 19370000, categoria: 'Cobro servicio' },
  { id: 'm14', fecha: '2026-04-10', tipo: 'egreso', concepto: 'Herramientas y equipos diagnóstico', monto: 320000, saldo: 18870000, categoria: 'Equipos' },
  { id: 'm15', fecha: '2026-04-09', tipo: 'ingreso', concepto: 'Pago servicio — Restaurante El Molo', monto: 540000, saldo: 19190000, categoria: 'Cobro servicio' },
  { id: 'm16', fecha: '2026-04-07', tipo: 'egreso', concepto: 'Materiales reparación frigorífico', monto: 420000, saldo: 18650000, categoria: 'Materiales' },
  { id: 'm17', fecha: '2026-04-05', tipo: 'egreso', concepto: 'Sueldos técnicos — primera quincena', monto: 3200000, saldo: 19070000, categoria: 'Remuneraciones' },
  { id: 'm18', fecha: '2026-04-04', tipo: 'ingreso', concepto: 'Pago servicio — Contreras Industrias (UPS)', monto: 1200000, saldo: 22270000, categoria: 'Cobro servicio' },
  { id: 'm19', fecha: '2026-04-03', tipo: 'ingreso', concepto: 'Pago servicio — Flores Hoteles SpA', monto: 780000, saldo: 21070000, categoria: 'Cobro servicio' },
  { id: 'm20', fecha: '2026-04-02', tipo: 'egreso', concepto: 'Seguro responsabilidad civil anual', monto: 280000, saldo: 20290000, categoria: 'Seguros' },
  { id: 'm21', fecha: '2026-04-01', tipo: 'ingreso', concepto: 'Pago servicio — Morales Transporte SpA', monto: 360000, saldo: 20570000, categoria: 'Cobro servicio' },
  { id: 'm22', fecha: '2026-03-31', tipo: 'egreso', concepto: 'IVA declaración mensual', monto: 920000, saldo: 20210000, categoria: 'Impuestos' },
  { id: 'm23', fecha: '2026-03-28', tipo: 'ingreso', concepto: 'Pago servicio — Rojas Alimentos', monto: 920000, saldo: 21130000, categoria: 'Cobro servicio' },
  { id: 'm24', fecha: '2026-03-26', tipo: 'egreso', concepto: 'Repuestos para mantención Frigorífico', monto: 540000, saldo: 20210000, categoria: 'Materiales' },
  { id: 'm25', fecha: '2026-03-25', tipo: 'ingreso', concepto: 'Pago servicio — Farmacia Castillo', monto: 290000, saldo: 20750000, categoria: 'Cobro servicio' },
  { id: 'm26', fecha: '2026-03-22', tipo: 'ingreso', concepto: 'Pago servicio — Centro Médico Molina (A/C pabellón)', monto: 2100000, saldo: 20460000, categoria: 'Cobro servicio' },
  { id: 'm27', fecha: '2026-03-20', tipo: 'egreso', concepto: 'Sueldos técnicos — marzo', monto: 6400000, saldo: 18360000, categoria: 'Remuneraciones' },
  { id: 'm28', fecha: '2026-03-19', tipo: 'ingreso', concepto: 'Pago servicio — Contreras Industrias', monto: 540000, saldo: 24760000, categoria: 'Cobro servicio' },
  { id: 'm29', fecha: '2026-03-15', tipo: 'ingreso', concepto: 'Pago servicio — Hotel Las Torres', monto: 1380000, saldo: 24220000, categoria: 'Cobro servicio' },
  { id: 'm30', fecha: '2026-03-10', tipo: 'egreso', concepto: 'Materiales y consumibles Q1', monto: 890000, saldo: 22840000, categoria: 'Materiales' },
]

export const revenueData = [
  { mes: 'May', ingresos: 11200000, costos: 7800000 },
  { mes: 'Jun', ingresos: 14600000, costos: 9400000 },
  { mes: 'Jul', ingresos: 17800000, costos: 11200000 },
  { mes: 'Ago', ingresos: 19200000, costos: 12400000 },
  { mes: 'Sep', ingresos: 18400000, costos: 11800000 },
  { mes: 'Oct', ingresos: 16900000, costos: 10600000 },
  { mes: 'Nov', ingresos: 15800000, costos: 9900000 },
  { mes: 'Dic', ingresos: 14200000, costos: 9100000 },
  { mes: 'Ene', ingresos: 12400000, costos: 8200000 },
  { mes: 'Feb', ingresos: 13800000, costos: 8900000 },
  { mes: 'Mar', ingresos: 16200000, costos: 10400000 },
  { mes: 'Abr', ingresos: 18500000, costos: 11800000 },
]

export const kpis = {
  ingresos_mes: 18500000,
  servicios_mes: 40,
  servicios_completados: 30,
  clientes_nuevos: 3,
  pagos_pendientes: 3200000,
  satisfaccion: 4.6,
  margen_mes: 6700000,
  saldo_caja: 18420000,
}

export const agentResponses = {
  dashboard: `**Resumen operacional — Abril 2026**\n\nServicios Rápidos Ltda. cierra abril con $18.5M en ingresos, un 14% sobre el mes anterior. El alza está impulsada por el inicio de la temporada de calefacción, que activa contratos de mantención preventiva.\n\n**Puntos clave del mes:**\n1. **Frigorífico Del Sur** generó $2.4M en 3 servicios — cliente más rentable del período.\n2. **Contreras Industrias** activó contrato UPS por $1.2M — primera instalación de esta categoría.\n3. Tasa de servicios completados: 75% — dentro del rango normal. 2 servicios cancelados por cliente.\n\n**Proyección mayo:**\nLa agenda de mayo ya tiene 8 servicios confirmados. Con el peak de invierno (Jun-Ago), se estima crecimiento de 20-25% en solicitudes de mantención de climatización y calefacción.`,
  leads: `**Pipeline de prospectos — Servicios Rápidos**\n\nLa empresa opera principalmente por referidos y contratos de mantención anual. El pipeline activo incluye cotizaciones para 3 nuevas instalaciones.\n\n**Prioridades:**\n1. **Colegio Campos** — Preparación calefacción invierno confirmada para mayo.\n2. **Hotel Las Torres** — Revisión sistema, potencial contrato anual $800K.\n3. **Nuevas consultas** — 2 consultas vía referidos de Clínica Santa Rosa.`,
}

// Compatibilidad con páginas que importan estos campos
export const leads: never[] = []
export const marketingData: never[] = []
