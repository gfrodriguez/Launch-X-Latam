# ABOGABOT

## Tabla de Contenido

 1. [Requerimientos](#1-requerimientos)
    - [Requisitos generales](#requisitos-generales)
    - [Requisitos para el Usuario - Cliente del Despacho](#requisitos-para-el-usuario---cliente-del-despacho)
    - [Requisitos para el Usurio - Administrador](#requisitos-para-el-usurio---administrador)
    - [Diagrama de flujo](#diagrama-de-flujo)
  2. [Buyer Persona](#2-buyer-persona)
  3. [Público Objetivo](#3-público-objetivo)
  4. [Wireframe](#3-wireframe)
#

## 1. Requerimientos

El cliente, un despacho de abogados, requiere automatizar las demandas que presentan sus clientes, a partir de una página web que captura un formulario.

### Requisitos generales

- Pagina de bienvenida
- Formulario de inicio de sesión
- Página Responsive
- Colores corporativos azul marino y blanco

### Requisitos para el Usuario - Cliente del Despacho

- Formulario de registro
- Formulario de diligenciamiento de demanda
- Formulario de pago
- Vista con información del usuario y estado
- Notificaciones al correo sobre avande del proceso

### Requisitos para el Usurio - Administrador

- Notificación nueva demanda
- Exportar un documento Word con una plantilla que involucre los datos del formulario
- Vista con pagos, con dashboard de ingresos
- Actualizar procesos de la demanda y agregar comentarios.

### Diagrama de flujo

Diagrama de flujo de los requerimientos

```mermaid
graph TD;
    A[Pagina de Bienvenida] --> B[Cliente];
    B --> D[Registro Usuarios Nuevos];
    D --> E;
    B --> E[Inicio de sesión];
    E --> G[Formulario de Registro de Demanda];
    G --> H[Formulario de pago];
    H --> I[Vista inforamación de demanda y estado];
    I --> J[Notificaciones al correo sobre avance];
    A --> C[Administrador];
    C --> K[Inicio de sesión];
    K--> L[Notificación nueva demanda];
    L-->M[Vista para exportar documento demanda prediligenciada];
    M-->N[Vista de pagos recibidos, dashboard de ingresos];
    N-->O[Vista para actualizar procesos de la demanda y agregar comentarios];
```
## 2. Buyer Persona

[![Buyer Persona - Pagina 1](images/buyerPersonaPageOne.png "Buyer Persona - Pagina 1")](images/buyerPersonaPageOne.png "Buyer Persona - Pagina 1")
[![Buyer Persona - Pagina 2](images/buyerPersonaPageTwo.png "Buyer Persona - Pagina 2")](images/buyerPersonaPageTwo.png "Buyer Persona - Pagina 2")

## 3. Público Objetivo

[![Público Objetivo](images/publicoObjetivo.png "Público Objetivo")](images/publicoObjetivo.png "Público Objetivo")

## 4. Wireframe

### Página de Bienvenida
[![Wireframe - Página bienvenida](images/pgina_de_bienvenida.png "Wireframe - Página bienvenida")](images/pgina_de_bienvenida.png "Wireframe - Página bienvenida")
### Formulario de Registro
[![Wireframe - Formulario de Registro](images/formulario_de_registro.png "Wireframe - Formulario de Registro")](images/formulario_de_registro.png "Wireframe - Formulario de Registro")
### Recuperar contraseña
[![Wireframe - Recuperar contraseña](images/recuperar_contrasea.png "Wireframe - Recuperar contraseña")](images/recuperar_contrasea.png "Wireframe - Recuperar contraseña")
### Página Principal Cliente
[![Wireframe - Página Principal Cliente](images/pgina_principal_cliente.png "Wireframe - Página Principal Cliente")](images/pgina_principal_cliente.png "Wireframe - Página Principal Cliente")
### Formulario Demanda
[![Wireframe - Formulario Demanda](images/formulario_demanda.png "Wireframe - Formulario Demanda")](images/formulario_demanda.png "Wireframe - Formulario Demanda")
### Formulario Pago
[![Wireframe - Formulario Pago](images/formulario_pago.png "Wireframe - Formulario Pago")](images/formulario_pago.png "Wireframe - Formulario Pago")
## Formulario Pago Exitoso
[![Wireframe - Formulario Pago Exitoso](images/formulario_pago_exitoso.png "Wireframe - Formulario Pago Exitoso")](images/formulario_pago_exitoso.png "Wireframe - Formulario Pago Exitoso")
