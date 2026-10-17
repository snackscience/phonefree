/* =========================================================
   폰프리스쿨 폰쉼표 — 서비스 워커

   ★ 이 파일이 있어야 안드로이드 크롬에 「앱 설치」가 뜹니다.
     (없으면 홈 화면 바로가기만 만들어지고 진짜 앱으로 안 열려요)

   ★ 일부러 아무것도 저장(캐시)하지 않습니다.
     화면을 항상 서버에서 새로 받아오므로, index.html 을 새로 올리면
     학생들이 바로 새 화면을 봅니다. 예전 화면이 남는 일이 없습니다.

   이 파일은 한 번만 올려 두면 되고, 앞으로 고칠 일이 없습니다.
   ========================================================= */

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));

self.addEventListener('fetch', e => {
  // 항상 네트워크에서 가져옵니다. 인터넷이 끊겼을 때만 짧은 안내를 보여 줍니다.
  if (e.request.mode !== 'navigate') return;
  /* cache: 'reload' — 폰에 담아 둔 옛 파일을 지나치고 반드시 서버에서 새로 받아옵니다.
     (2026-10-17 추가. 이게 없으면 올린 뒤에도 한동안 옛 화면이 보일 수 있습니다) */
  e.respondWith(
    fetch(e.request, { cache: 'reload' }).catch(() => fetch(e.request)).catch(() => new Response(
      '<!doctype html><html lang="ko"><meta charset="utf-8">' +
      '<meta name="viewport" content="width=device-width,initial-scale=1">' +
      '<body style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;background:#F8FAFC;' +
      'color:#1E293B;display:grid;place-items:center;height:100vh;margin:0;text-align:center;padding:24px">' +
      '<div><p style="font-size:44px;margin:0 0 8px">📡</p>' +
      '<p style="font-weight:800;font-size:18px;margin:0 0 6px">인터넷이 연결되지 않았어요</p>' +
      '<p style="color:#64748B;font-size:14px;margin:0">잠시 뒤 다시 열어 주세요.</p></div></body></html>',
      { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    ))
  );
});
