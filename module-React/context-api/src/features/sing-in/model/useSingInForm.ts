import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const SingInSchemaZod = z.object({
  nickname: z.string().trim().min(2, "Мин. 2 символов").toLowerCase(),
  password: z.string().trim().min(6, "Мин. 6 символов"),
});

export type SingInType = z.infer<typeof SingInSchemaZod>;

export const useSingInForm = () => {
  const {
    register,
    formState: { errors, isSubmitted, isSubmitting, isValid },
    handleSubmit,
    reset,
  } = useForm<SingInType>({
    resolver: zodResolver(SingInSchemaZod),
  });

  return {
    register,
    handleSubmit,
    reset,

    errors,
    isSubmitted,
    isSubmitting,
    isValid,
  };
};
