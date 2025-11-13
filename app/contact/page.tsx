import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "İletişim | Murathan Algır",
  description: "Proje ve işbirliği talepleriniz için iletişim formu.",
};

export default function Page() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-semibold">İletişim</h1>
      <p className="mt-2 opacity-80 max-w-2xl">
        Projeler, freelance işler veya danışmanlık için bu formu kullanarak ulaşabilirsin.
      </p>
      <div className="mt-8">
        <ContactForm />
      </div>
    </main>
  );
}