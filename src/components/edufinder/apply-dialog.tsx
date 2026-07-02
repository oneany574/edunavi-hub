import { useState } from "react";
import { toast } from "sonner";
import { ArrowRight, CheckCircle2, Download, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { College } from "@/lib/edufinder-data";
import { formatFees, formatPackage } from "@/lib/edufinder-data";

type Props = {
  college: College;
  trigger: React.ReactNode;
};

export function ApplyDialog({ college, trigger }: Props) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"form" | "success">("form");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    if (!name || !email || !phone) {
      toast.error("Please fill all required fields");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setStep("success");
      toast.success(`Application started for ${college.shortName}`);
    }, 900);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) setTimeout(() => setStep("form"), 200);
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-lg overflow-hidden p-0">
        <div className={`bg-gradient-to-br ${college.heroAccent} px-6 py-5 text-white`}>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">
            Applying to
          </p>
          <DialogTitle className="font-display mt-1 text-2xl">{college.name}</DialogTitle>
          <DialogDescription className="mt-1 text-xs text-white/80">
            {college.city}, {college.country} • Ranked #{college.ranking}
          </DialogDescription>
        </div>

        {step === "form" ? (
          <form onSubmit={handleSubmit} className="space-y-4 px-6 py-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="name" label="Full name" required />
              <Field id="phone" label="Phone" required type="tel" placeholder="+1 555…" />
            </div>
            <Field id="email" label="Email" required type="email" />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="program" label="Interested program" placeholder="e.g. Computer Science" />
              <Field id="intake" label="Preferred intake" placeholder="Fall 2027" />
            </div>
            <div>
              <Label htmlFor="message">Message (optional)</Label>
              <Textarea
                id="message"
                name="message"
                rows={3}
                placeholder="Anything the admissions team should know?"
                className="mt-1.5"
              />
            </div>
            <p className="text-[11px] text-muted-foreground">
              By submitting you agree to be contacted about admissions. Fees {formatFees(college)} • Avg package {formatPackage(college)}.
            </p>
            <DialogFooter className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand py-3 text-sm font-bold text-brand-foreground disabled:opacity-70 sm:w-auto sm:px-6"
              >
                {submitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" /> Submitting…
                  </>
                ) : (
                  <>
                    Submit application <ArrowRight className="size-4" />
                  </>
                )}
              </button>
            </DialogFooter>
          </form>
        ) : (
          <div className="px-6 py-10 text-center">
            <div className="mx-auto grid size-14 place-items-center rounded-full bg-success/10 text-success">
              <CheckCircle2 className="size-7" />
            </div>
            <p className="font-display mt-4 text-2xl">Application received</p>
            <p className="mt-2 text-sm text-muted-foreground">
              An admissions counsellor from {college.shortName} will reach out within 48 hours.
            </p>
            <button
              onClick={() => setOpen(false)}
              className="mt-6 rounded-full bg-brand px-6 py-2.5 text-sm font-bold text-brand-foreground"
            >
              Done
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Field({
  id,
  label,
  required,
  type = "text",
  placeholder,
}: {
  id: string;
  label: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <Label htmlFor={id}>
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      <Input
        id={id}
        name={id}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-1.5"
      />
    </div>
  );
}

export function BrochureButton({
  college,
  className,
  children,
}: {
  college: College;
  className?: string;
  children: React.ReactNode;
}) {
  const [busy, setBusy] = useState(false);

  const download = () => {
    setBusy(true);
    const content = buildBrochureText(college);
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${college.slug}-brochure.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    setTimeout(() => {
      setBusy(false);
      toast.success("Brochure downloaded", {
        description: `${college.shortName} — 2027 admissions guide`,
      });
    }, 400);
  };

  return (
    <button type="button" onClick={download} disabled={busy} className={className}>
      {busy ? <Loader2 className="size-4 animate-spin" /> : <Download className="size-4" />}
      {children}
    </button>
  );
}

function buildBrochureText(c: College) {
  return `${c.name}
${c.city}, ${c.country}
Ranked #${c.ranking} ${c.rankingLabel}
Established ${c.established} • ${c.ownership}

Annual fees: ${formatFees(c)}
Avg package: ${formatPackage(c)}
Placement rate: ${c.placementRate}%
Student ratio: ${c.studentRatio}
International share: ${c.internationalShare}%

About
------
${c.about}

Top recruiters
--------------
${c.topRecruiters.join(", ")}

Facilities
----------
${c.facilities.map((f) => `• ${f}`).join("\n")}

Exams accepted
--------------
${c.examsAccepted.join(", ")}

— EduFinder | ${new Date().toDateString()}
`;
}
