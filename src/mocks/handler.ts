import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/restaurants', () => {
    return HttpResponse.json([
      { id: '1', name: 'Asador Extebarri', description: '스페인 빌바오에 위치한, 숯을 이용해 요리 스페인 빌바오에 위치한, 숯을 이용해 요리 스페인 빌바오에 위치한, 숯을 이용해 요리' },
      { id: '2', name: 'Martin Berasategui', description: '내가 제일 좋아하는 곳' },
      { id: '3', name: 'Madison Eleven Park', description: '세계 1등 몇번 찍어본 곳' },
      { id: '4', name: 'Arzak', description: '안가본 곳' },
      { id: '5', name: 'Akelarre', description: '뷰는 좋은데 맛은 3스타급이 아닌 곳' },
      { id: '6', name: 'Mingles', description: '한국에서 잘나가는 곳' },
      { id: '7', name: '"Y\'east"', description: 'Maverick' },
      { id: '8', name: 'Soigne', description: 'Maverick' },
      { id: '9', name: 'Diver XO', description: 'Maverick' },
      { id: '10', name: 'Disfurtar', description: 'Maverick' },
    ]);
    // return new HttpResponse(null, { status: 401 })
  }),

  http.get('/restaurant', () => {
    return HttpResponse.json([
      { id: '1', name: 'Asador Extebarri', description: '스페인 빌바오에 위치한, 숯을 이용해 요리 스페인 빌바오에 위치한, 숯을 이용해 요리 스페인 빌바오에 위치한, 숯을 이용해 요리' },
    ]);
    // return new HttpResponse(null, { status: 401 })
  }),
];

// async function isAuthenticated(request) {
//   if (!request.headers.has('cookie')) {
//     throw new HttpResponse(null, { status: 400 })
//   }
// }
//
// http.post('/login', async ({ request }) => {
//   await isAuthenticated(request)
//
//   return new HttpResponse(null, {
//     status: 302,
//     headers: {
//       Location: '/dashboard',
//     },
//   })
// })
