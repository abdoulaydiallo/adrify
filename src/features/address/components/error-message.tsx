import { Card, CardContent } from "@/components/ui/card";

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <Card className="w-full max-w-2xl mx-auto bg-red-50">
    <CardContent className="text-red-600 p-4">
      <p>Une erreur s&apos;est produite : {message}</p>
    </CardContent>
  </Card>
);
