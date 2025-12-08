import { http, HttpResponse } from "msw";

export const handlers = [
  http.post(
    "https://731xy9c2ak.execute-api.eu-north-1.amazonaws.com/booking",
    async () => {
      return HttpResponse.json({
        bookingDetails: {
          bookingId: "TEST123",
          when: "2025-12-25T19:00",
          people: 4,
          lanes: 1,
          price: 580,
        },
      });
    }
  ),
];
