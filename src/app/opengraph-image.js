import { ImageResponse } from 'next/og';

export const alt = 'Your Home Like You - Your home. Like you.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: 'stretch',
        background: '#f2ede4',
        color: '#241d19',
        display: 'flex',
        height: '100%',
        width: '100%',
      }}
    >
      <div
        style={{
          background: '#8f201b',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '70px 64px',
          width: 310,
        }}
      >
        <div
          style={{
            alignItems: 'center',
            border: '3px solid #f2ede4',
            borderRadius: 999,
            color: '#f2ede4',
            display: 'flex',
            fontFamily: 'Georgia, serif',
            fontSize: 58,
            height: 150,
            justifyContent: 'center',
            width: 150,
          }}
        >
          YH
        </div>
        <div
          style={{
            color: '#f2ede4',
            display: 'flex',
            flexDirection: 'column',
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: 3,
            lineHeight: 1.35,
            textTransform: 'uppercase',
          }}
        >
          <span>Your Home</span>
          <span>Like You</span>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '76px 82px 68px',
        }}
      >
        <span
          style={{
            color: '#8f201b',
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: 4,
            textTransform: 'uppercase',
          }}
        >
          Property, made personal
        </span>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontFamily: 'Georgia, serif',
            fontSize: 88,
            letterSpacing: -4,
            lineHeight: 0.96,
          }}
        >
          <span>Your home.</span>
          <span style={{ color: '#8f201b', fontStyle: 'italic' }}>Like you.</span>
        </div>
        <span style={{ color: '#665c55', fontSize: 24 }}>
          Construction and renovation, coordinated from first conversation to final handover.
        </span>
      </div>
    </div>,
    size,
  );
}
