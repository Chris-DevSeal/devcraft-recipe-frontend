'use client';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  let errorMessage;
  switch (error) {
    case 'OAuthAccountNotLinked':
      errorMessage = 'Das Konto ist nicht mit einem OAuth-Provider verknüpft.';
      break;
    case 'EmailCreateAccount':
      errorMessage = 'Fehler beim Erstellen des Kontos mit dieser E-Mail-Adresse.';
      break;
    default:
      errorMessage = 'Ein unbekannter Fehler ist aufgetreten. Bitte versuche es erneut.';
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-2xl mb-4">Anmeldefehler</h1>
      <p className="mb-4">{errorMessage}</p>
      <Link href="/api/auth/custom-signin" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
        Zurück zur Anmeldeseite
      </Link>
    </div>
  );
}
