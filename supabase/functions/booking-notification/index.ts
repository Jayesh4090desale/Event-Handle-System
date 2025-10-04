import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface BookingNotification {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  event_type: string;
  event_date: string;
  time_slot: string;
  guest_count: number;
  estimated_price: number;
  special_requirements?: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const booking: BookingNotification = await req.json();

    const whatsappMessage = `
🎉 *New Booking Request* 🎉

📋 *Customer Details:*
Name: ${booking.customer_name}
Email: ${booking.customer_email}
Phone: ${booking.customer_phone}

📅 *Event Details:*
Type: ${booking.event_type}
Date: ${booking.event_date}
Time: ${booking.time_slot}
Guests: ${booking.guest_count}

💰 *Estimated Price:* ₹${booking.estimated_price.toLocaleString()}

${booking.special_requirements ? `📝 *Special Requirements:*\n${booking.special_requirements}` : ''}

Please contact the customer to confirm the booking.
    `.trim();

    const emailMessage = `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
            <h2 style="color: #d42f48; border-bottom: 2px solid #d42f48; padding-bottom: 10px;">
              New Booking Request
            </h2>

            <div style="background-color: white; padding: 20px; margin: 20px 0; border-radius: 8px;">
              <h3 style="color: #333; margin-top: 0;">Customer Details</h3>
              <p><strong>Name:</strong> ${booking.customer_name}</p>
              <p><strong>Email:</strong> ${booking.customer_email}</p>
              <p><strong>Phone:</strong> ${booking.customer_phone}</p>
            </div>

            <div style="background-color: white; padding: 20px; margin: 20px 0; border-radius: 8px;">
              <h3 style="color: #333; margin-top: 0;">Event Details</h3>
              <p><strong>Event Type:</strong> ${booking.event_type}</p>
              <p><strong>Date:</strong> ${booking.event_date}</p>
              <p><strong>Time Slot:</strong> ${booking.time_slot}</p>
              <p><strong>Guest Count:</strong> ${booking.guest_count}</p>
            </div>

            <div style="background-color: #f0fdf4; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #22c55e;">
              <h3 style="color: #166534; margin-top: 0;">Estimated Price</h3>
              <p style="font-size: 24px; font-weight: bold; color: #166534; margin: 0;">
                ₹${booking.estimated_price.toLocaleString()}
              </p>
            </div>

            ${booking.special_requirements ? `
              <div style="background-color: white; padding: 20px; margin: 20px 0; border-radius: 8px;">
                <h3 style="color: #333; margin-top: 0;">Special Requirements</h3>
                <p>${booking.special_requirements}</p>
              </div>
            ` : ''}

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
              <p style="color: #666; font-size: 14px; margin: 0;">
                Please contact the customer to confirm the booking and finalize the details.
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    const whatsappUrl = `https://wa.me/919359525834?text=${encodeURIComponent(whatsappMessage)}`;

    const response = {
      success: true,
      message: "Notification prepared successfully",
      whatsappUrl: whatsappUrl,
      emailPreview: emailMessage,
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "Failed to process notification",
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
