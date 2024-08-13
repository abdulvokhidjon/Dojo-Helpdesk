import { notFound } from "next/navigation";

export const dynamicParams = true; // default value = true

export async function generateStaticParams() {
  const res = await fetch(
    "https://json-api.uz/api/project/dojo-tickets/tickets"
  );

  const tickets = await res.json();

  // Ensure id is a string
  return tickets.data.map((ticket) => ({
    id: String(ticket.id),
  }));
}

async function getTicket(id) {
  // Imitate delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const res = await fetch(
    `https://json-api.uz/api/project/dojo-tickets/tickets/${id}`,
    {
      next: {
        revalidate: 0,
      },
    }
  );

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

export default async function TicketDetails({ params }) {
  const id = params.id; // Ensure id is a string
  const ticket = await getTicket(id);

  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
      </nav>
      <div className="card">
        <h3>{ticket.title}</h3>
        <small>Created by {ticket.user_email}</small>
        <p>{ticket.body}</p>
        <div className={`pill ${ticket.priority}`}>
          {ticket.priority} priority
        </div>
      </div>
    </main>
  );
}
