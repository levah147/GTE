export default function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} AbujaRide (GTE Project). All rights reserved.</p>
        <p className="mt-1">Digitizing Transportation for a Safer Abuja.</p>
      </div>
    </footer>
  );
}
