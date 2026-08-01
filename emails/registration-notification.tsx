import type { CSSProperties } from 'react';

export type RegistrationNotificationProps = {
  academyName: string;
  applicationId: string;
  parentName: string;
  playerName: string;
  birthYear: number;
  phone: string;
  selectedProgram: string;
  submittedAt: string;
};

export function RegistrationNotificationEmail({
  academyName,
  applicationId,
  parentName,
  playerName,
  birthYear,
  phone,
  selectedProgram,
  submittedAt,
}: RegistrationNotificationProps) {
  const formattedDate = new Intl.DateTimeFormat('tr-TR', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'Europe/Istanbul',
  }).format(new Date(submittedAt));
  const phoneDisplay = `+${phone}`;
  const whatsappUrl = `https://wa.me/${phone}`;

  return (
    <html lang="tr">
      <body style={styles.body}>
        <div style={styles.container}>
          <div style={styles.header}>
            <div style={styles.mark}>J</div>
            <div>
              <p style={styles.eyebrow}>{academyName}</p>
              <h1 style={styles.heading}>Yeni kayıt başvurusu</h1>
            </div>
          </div>

          <p style={styles.intro}>
            Web sitesindeki kayıt formundan yeni bir ücretsiz deneme başvurusu geldi.
          </p>

          <div style={styles.card}>
            <Detail label="Sporcu" value={playerName} />
            <Detail label="Veli" value={parentName} />
            <Detail label="Doğum yılı" value={String(birthYear)} />
            <Detail label="Program" value={selectedProgram} />
            <Detail label="Başvuru zamanı" value={formattedDate} />
          </div>

          <div style={styles.actions}>
            <a href={`tel:${phoneDisplay}`} style={styles.primaryButton}>Telefonla ara</a>
            <a href={whatsappUrl} style={styles.secondaryButton}>WhatsApp&apos;tan yaz</a>
          </div>

          <p style={styles.phone}>İletişim numarası: <strong>{phoneDisplay}</strong></p>
          <p style={styles.footer}>
            Başvuru no: {applicationId}. Bu kayıt aynı zamanda yönetim panelindeki Başvurular bölümüne kaydedildi.
          </p>
        </div>
      </body>
    </html>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div style={styles.detailRow}>
      <span style={styles.detailLabel}>{label}</span>
      <strong style={styles.detailValue}>{value}</strong>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  body: {
    margin: 0,
    padding: '32px 12px',
    backgroundColor: '#f4f4f3',
    color: '#111111',
    fontFamily: 'Arial, Helvetica, sans-serif',
  },
  container: {
    maxWidth: '620px',
    margin: '0 auto',
    overflow: 'hidden',
    border: '1px solid #e4e4e1',
    borderRadius: '20px',
    backgroundColor: '#ffffff',
    boxShadow: '0 14px 36px rgba(0,0,0,0.08)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '26px 28px',
    backgroundColor: '#090909',
    color: '#ffffff',
  },
  mark: {
    display: 'flex',
    width: '48px',
    height: '48px',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '14px',
    backgroundColor: '#f5b91e',
    color: '#090909',
    fontSize: '27px',
    fontWeight: 900,
  },
  eyebrow: {
    margin: '0 0 5px',
    color: '#f5b91e',
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
  },
  heading: { margin: 0, fontSize: '25px', lineHeight: 1.2 },
  intro: { margin: 0, padding: '26px 28px 10px', color: '#50504d', fontSize: '15px', lineHeight: 1.6 },
  card: { margin: '12px 28px 22px', border: '1px solid #e8e8e5', borderRadius: '14px', overflow: 'hidden' },
  detailRow: { padding: '13px 15px', borderBottom: '1px solid #eeeeeb' },
  detailLabel: { display: 'block', marginBottom: '4px', color: '#777772', fontSize: '11px', letterSpacing: '0.7px', textTransform: 'uppercase' },
  detailValue: { display: 'block', color: '#111111', fontSize: '15px', lineHeight: 1.45 },
  actions: { display: 'flex', gap: '10px', padding: '0 28px' },
  primaryButton: { display: 'inline-block', padding: '13px 18px', borderRadius: '10px', backgroundColor: '#f5b91e', color: '#111111', fontSize: '14px', fontWeight: 700, textDecoration: 'none' },
  secondaryButton: { display: 'inline-block', padding: '12px 18px', border: '1px solid #cfcfca', borderRadius: '10px', backgroundColor: '#ffffff', color: '#111111', fontSize: '14px', fontWeight: 700, textDecoration: 'none' },
  phone: { margin: 0, padding: '18px 28px 22px', color: '#484844', fontSize: '13px' },
  footer: { margin: 0, padding: '18px 28px', borderTop: '1px solid #eeeeeb', backgroundColor: '#fafaf8', color: '#82827d', fontSize: '11px', lineHeight: 1.6 },
};
