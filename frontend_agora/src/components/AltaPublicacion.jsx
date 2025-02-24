import { Button, ButtonText } from "@/components/ui/button";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlErrorIcon,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { AlertCircleIcon } from "@/components/ui/icon";
import React, { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectItem,
} from "@/components/ui/select";
import { ChevronDownIcon } from "@/components/ui/icon"; // Asegúrate de tener esta librería instalada

function AltaScreen() {
  const temas = [
    "Actualidad",
    "Tecnología",
    "Deportes",
    "Entretenimiento",
    "Política",
    "Educación",
    "Salud",
    "Negocios",
    "Ciencia",
    "Medio Ambiente",
    "Arte y Cultura",
    "Viajes",
    "Moda",
    "Gastronomía",
    "Humor",
    "Videojuegos",
    "Automóviles",
    "Fitness",
    "Relaciones",
    "Mascotas",
  ];

  const [isInvalid, setIsInvalid] = useState(false);
  const [datos, setDatos] = useState({
    titulo: "",
    texto: "",
    nombre_usuario: "",
    tema: "",
  });

  const handleSubmit = () => {
    // Validar que ningún campo esté vacío
    if (!datos.titulo || !datos.texto || !datos.nombre_usuario || !datos.tema) {
      setIsInvalid(true); // Mostrar errores si algún campo está vacío
      return;
    }

    // Si todo está bien, enviar los datos
    console.log("Datos enviados:", datos);
    setIsInvalid(false); // Ocultar errores
  };

  const handleChange = (field, value) => {
    setDatos({
      ...datos,
      [field]: value,
    });
  };

  return (
    <VStack className="w-full max-w-[300px] rounded-md border border-background-200 p-4">
      {/* Campo: Título */}
      <FormControl
        isInvalid={isInvalid && !datos.titulo}
        size="md"
        isDisabled={false}
        isReadOnly={false}
        isRequired={true}
      >
        <FormControlLabel>
          <FormControlLabelText>Título</FormControlLabelText>
        </FormControlLabel>
        <Input className="my-1" size="md">
          <InputField
            type="text"
            placeholder="Título"
            value={datos.titulo}
            onChangeText={(value) => handleChange("titulo", value)}
          />
        </Input>
        {isInvalid && !datos.titulo && (
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>
              El título es obligatorio.
            </FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>

      {/* Campo: Texto */}
      <FormControl
        isInvalid={isInvalid && !datos.texto}
        size="md"
        isDisabled={false}
        isReadOnly={false}
        isRequired={true}
      >
        <FormControlLabel>
          <FormControlLabelText>Texto</FormControlLabelText>
        </FormControlLabel>
        <Input className="my-1" size="md">
          <InputField
            type="text"
            placeholder="Texto"
            value={datos.texto}
            onChangeText={(value) => handleChange("texto", value)}
          />
        </Input>
        {isInvalid && !datos.texto && (
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>
              El texto es obligatorio.
            </FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>

      {/* Campo: Nombre de usuario */}
      <FormControl
        isInvalid={isInvalid && !datos.nombre_usuario}
        size="md"
        isDisabled={false}
        isReadOnly={false}
        isRequired={true}
      >
        <FormControlLabel>
          <FormControlLabelText>Nombre de usuario</FormControlLabelText>
        </FormControlLabel>
        <Input className="my-1" size="md">
          <InputField
            type="text"
            placeholder="Nombre de usuario"
            value={datos.nombre_usuario}
            onChangeText={(value) => handleChange("nombre_usuario", value)}
          />
        </Input>
        {isInvalid && !datos.nombre_usuario && (
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>
              El nombre de usuario es obligatorio.
            </FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>

      {/* Campo: Tema (Select de Gluestack) */}
      <FormControl
        isInvalid={isInvalid && !datos.tema}
        size="md"
        isDisabled={false}
        isReadOnly={false}
        isRequired={true}
      >
        <FormControlLabel>
          <FormControlLabelText>Tema</FormControlLabelText>
        </FormControlLabel>
        <Select
          selectedValue={datos.tema}
          onValueChange={(value) => handleChange("tema", value)}
        >
          <SelectTrigger variant="outline" size="md">
            <SelectInput placeholder="Selecciona un tema" />
            <SelectIcon className="mr-3" as={ChevronDownIcon} />
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              {temas.map((tema, index) => (
                <SelectItem
                  key={index}
                  label={tema}
                  value={tema.toLowerCase()} // Convertimos el tema a minúsculas para el valor
                />
              ))}
            </SelectContent>
          </SelectPortal>
        </Select>
        {isInvalid && !datos.tema && (
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>
              El tema es obligatorio.
            </FormControlErrorText>
          </FormControlError>
        )}
      </FormControl>

      {/* Botón de envío */}
      <Button className="w-fit self-end mt-4" size="sm" onPress={handleSubmit}>
        <ButtonText>Submit</ButtonText>
      </Button>
    </VStack>
  );
}

export default AltaScreen;