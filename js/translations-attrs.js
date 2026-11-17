/* Greek equivalents of attribute text (alt, aria-label), page titles and
   meta descriptions. Keys are the exact English strings used in the HTML.
   Applied by js/i18n.js so that assistive technology reads Greek text
   when the site language is Greek (WCAG 1.1.1, 3.1.1, 3.1.2). */
var ATTR_EL = {
  /* ---- Navigation / landmarks ---- */
  'Main navigation': 'Κύριο μενού πλοήγησης',
  'OSP Contractors — go to homepage': 'OSP Contractors — μετάβαση στην αρχική σελίδα',
  'Toggle navigation menu': 'Άνοιγμα/κλείσιμο μενού πλοήγησης',
  'Footer navigation': 'Πλοήγηση υποσέλιδου',
  'Policies': 'Πολιτικές',
  'Company statistics': 'Στατιστικά εταιρείας',
  'Key figures': 'Βασικά μεγέθη',
  'List of clients': 'Λίστα πελατών',
  'View our certifications': 'Δείτε τις πιστοποιήσεις μας',
  'Office locations and contact details': 'Τοποθεσίες γραφείων και στοιχεία επικοινωνίας',
  'Contact form': 'Φόρμα επικοινωνίας',
  'Map showing OSP Contractors office locations in Athens and Trikala': 'Χάρτης με τα γραφεία της OSP Contractors σε Αθήνα και Τρίκαλα',
  'Filter projects by category': 'Φιλτράρισμα έργων ανά κατηγορία',
  'Project statistics': 'Στατιστικά έργου',
  'Machinery and facilities photos': 'Φωτογραφίες μηχανημάτων και εγκαταστάσεων',

  /* ---- Download links ---- */
  'Download ISO 9001 certificate (PDF)': 'Λήψη πιστοποιητικού ISO 9001 (PDF)',
  'Download ISO 14001 certificate (PDF)': 'Λήψη πιστοποιητικού ISO 14001 (PDF)',
  'Download ISO 45001 certificate (PDF)': 'Λήψη πιστοποιητικού ISO 45001 (PDF)',
  'Download Quality and Environment Policy (PDF)': 'Λήψη Πολιτικής Ποιότητας και Περιβάλλοντος (PDF)',

  /* ---- Service links ---- */
  'Learn more about Engineering Services': 'Μάθετε περισσότερα για τις Υπηρεσίες Μελετών',
  'Learn more about Civil Works': 'Μάθετε περισσότερα για τα Πολιτικά Έργα',
  'Learn more about Cable Installation': 'Μάθετε περισσότερα για την Εγκατάσταση Καλωδίων',
  'Learn more about Cable Recovery': 'Μάθετε περισσότερα για την Ανάκτηση Καλωδίων',
  'Learn more about Customer Premises Installation': 'Μάθετε περισσότερα για την Εγκατάσταση σε Εγκαταστάσεις Πελατών',
  'Learn more about Splicing and Certification': 'Μάθετε περισσότερα για τη Συγκόλληση και Πιστοποίηση',

  /* ---- Home / company / certifications images ---- */
  'ISO 9001, ISO 14001 and ISO 45001 certification logos held by OSP Contractors': 'Λογότυπα των πιστοποιήσεων ISO 9001, ISO 14001 και ISO 45001 της OSP Contractors',
  'ISO quality management certifications held by OSP Contractors': 'Πιστοποιήσεις διαχείρισης ποιότητας ISO της OSP Contractors',
  'OSP Contractors field crew at work on a telecoms infrastructure project': 'Συνεργείο πεδίου της OSP Contractors σε έργο τηλεπικοινωνιακών υποδομών',
  'OSP Contractors crew carrying out fibre optic cable installation works': 'Συνεργείο της OSP Contractors κατά την εγκατάσταση καλωδίων οπτικής ίνας',
  'OSP Contractors machinery — excavation equipment on site': 'Μηχανήματα της OSP Contractors — εξοπλισμός εκσκαφής στο έργο',
  'OSP Contractors machinery — cable installation equipment': 'Μηχανήματα της OSP Contractors — εξοπλισμός εγκατάστασης καλωδίων',
  'OSP Contractors machinery — specialised telecom tooling': 'Μηχανήματα της OSP Contractors — εξειδικευμένα εργαλεία τηλεπικοινωνιών',
  'OSP Contractors machinery — personnel and vehicles': 'Μηχανήματα της OSP Contractors — προσωπικό και οχήματα',
  'OSP Contractors company history timeline from 1981 to present': 'Χρονολόγιο της ιστορίας της OSP Contractors από το 1981 έως σήμερα',

  /* ---- Clients ---- */
  'OLP — Piraeus Port Authority': 'ΟΛΠ — Οργανισμός Λιμένος Πειραιώς',
  'Municipality of Trikala': 'Δήμος Τρικκαίων',
  'Municipality of Cholargos': 'Δήμος Χολαργού',

  /* ---- Services page ---- */
  'Engineering survey and planning': 'Μελέτη πεδίου και σχεδιασμός',
  'Network design and documentation': 'Σχεδιασμός δικτύου και τεκμηρίωση',
  'Field engineering operations': 'Εργασίες μηχανικών πεδίου',
  'Engineering project management': 'Διαχείριση τεχνικών έργων',
  'Cable installation crew at work': 'Συνεργείο εγκατάστασης καλωδίων σε εργασία',
  'Cable installation': 'Εγκατάσταση καλωδίων',
  'Cable blowing equipment': 'Εξοπλισμός εμφύσησης καλωδίων',
  'Cable drum trailer': 'Τρέιλερ μεταφοράς καρουλιών καλωδίων',
  'Civil works — excavation': 'Πολιτικά έργα — εκσκαφή',
  'Civil works — trenching': 'Πολιτικά έργα — διάνοιξη τάφρου',
  'Civil works — reinstatement': 'Πολιτικά έργα — αποκατάσταση',
  'Civil works — surface works': 'Πολιτικά έργα — εργασίες επιφάνειας',
  'Cable recovery — copper extraction': 'Ανάκτηση καλωδίων — εξαγωγή χαλκού',
  'Cable recovery — dismantling overhead cables': 'Ανάκτηση καλωδίων — αποξήλωση εναέριων καλωδίων',
  'Cable recovery — coiling recovered cable': 'Ανάκτηση καλωδίων — περιτύλιξη ανακτημένου καλωδίου',
  'Cable recovery — recovered copper ready for transport': 'Ανάκτηση καλωδίων — ανακτημένος χαλκός έτοιμος για μεταφορά',
  'Customer premises installation': 'Εγκατάσταση σε εγκαταστάσεις πελατών',
  'Splicing — fusion splice machine': 'Συγκόλληση — μηχανή σύντηξης ινών',
  'Splicing — fibre preparation': 'Συγκόλληση — προετοιμασία ίνας',
  'Splicing — OTDR testing': 'Συγκόλληση — δοκιμές OTDR',
  'Splicing — fibre termination': 'Συγκόλληση — τερματισμός ίνας',
  'Splicing — distribution frame': 'Συγκόλληση — πλαίσιο διανομής',
  'Splicing — certification testing': 'Συγκόλληση — δοκιμές πιστοποίησης',
  'Splicing — completed splice closure': 'Συγκόλληση — ολοκληρωμένο κουτί σύνδεσης',

  /* ---- Significant projects: infographics ---- */
  'FTTH Network Deployments infographic': 'Infographic: Αναπτύξεις δικτύων FTTH',
  'FTTH In-House Building Connections infographic': 'Infographic: Εσωτερικές συνδέσεις κτιρίων FTTH',
  'NGA FTTC Networks Development infographic': 'Infographic: Ανάπτυξη δικτύων NGA FTTC',
  'Business Customers Ad-Hoc Projects infographic': 'Infographic: Έργα ad-hoc για επιχειρηματικούς πελάτες',
  'Copper Cable Recovery infographic': 'Infographic: Ανάκτηση χάλκινων καλωδίων',
  'Pilot FTTH Deployment — Rhodes infographic': 'Infographic: Πιλοτική ανάπτυξη FTTH — Ρόδος',
  'Pilot Smart City Project — Trikala infographic': 'Infographic: Πιλοτικό έργο Έξυπνης Πόλης — Τρίκαλα',

  /* ---- Significant projects: FTTH ---- */
  'FTTH deployment — network overview': 'Ανάπτυξη FTTH — επισκόπηση δικτύου',
  'FTTH deployment — cable installation': 'Ανάπτυξη FTTH — εγκατάσταση καλωδίων',
  'FTTH deployment — on-site works': 'Ανάπτυξη FTTH — εργασίες στο πεδίο',
  'FTTH deployment — distribution point': 'Ανάπτυξη FTTH — σημείο διανομής',
  'FTTH deployment — crew at work': 'Ανάπτυξη FTTH — συνεργείο σε εργασία',
  'FTTH deployment — site progress': 'Ανάπτυξη FTTH — πρόοδος εργασιών',
  'FTTH deployment — equipment': 'Ανάπτυξη FTTH — εξοπλισμός',
  'FTTH deployment — completed installation': 'Ανάπτυξη FTTH — ολοκληρωμένη εγκατάσταση',
  'FTTH in-house — building entry': 'Εσωτερική σύνδεση FTTH — είσοδος κτιρίου',
  'FTTH in-house — riser installation': 'Εσωτερική σύνδεση FTTH — εγκατάσταση κατακόρυφης όδευσης',
  'FTTH in-house — distribution panel': 'Εσωτερική σύνδεση FTTH — πίνακας διανομής',
  'FTTH in-house — floor wiring': 'Εσωτερική σύνδεση FTTH — καλωδίωση ορόφου',
  'FTTH in-house — apartment connection': 'Εσωτερική σύνδεση FTTH — σύνδεση διαμερίσματος',
  'FTTH in-house — termination': 'Εσωτερική σύνδεση FTTH — τερματισμός',
  'FTTH in-house — completed connection': 'Εσωτερική σύνδεση FTTH — ολοκληρωμένη σύνδεση',
  'FTTH in-house — splice closure': 'Εσωτερική σύνδεση FTTH — κουτί συγκόλλησης',

  /* ---- NGA FTTC ---- */
  'NGA FTTC — cabinet installation': 'NGA FTTC — εγκατάσταση καμπίνας',
  'NGA FTTC — street cabinet': 'NGA FTTC — καμπίνα δρόμου',
  'NGA FTTC — trenching works': 'NGA FTTC — εργασίες διάνοιξης τάφρου',
  'NGA FTTC — cable routing': 'NGA FTTC — όδευση καλωδίων',
  'NGA FTTC — fibre connection': 'NGA FTTC — σύνδεση οπτικής ίνας',
  'NGA FTTC — network node': 'NGA FTTC — κόμβος δικτύου',
  'NGA FTTC — completed cabinet': 'NGA FTTC — ολοκληρωμένη καμπίνα',
  'NGA FTTC — site overview': 'NGA FTTC — συνολική άποψη εργοταξίου',

  /* ---- Ad-hoc ---- */
  'Ad-hoc project — site survey': 'Έργο ad-hoc — αυτοψία εργοταξίου',
  'Ad-hoc project — cable laying': 'Έργο ad-hoc — τοποθέτηση καλωδίων',
  'Ad-hoc project — network installation': 'Έργο ad-hoc — εγκατάσταση δικτύου',
  'Ad-hoc project — connection works': 'Έργο ad-hoc — εργασίες σύνδεσης',
  'Ad-hoc project — on-site crew': 'Έργο ad-hoc — συνεργείο στο πεδίο',
  'Ad-hoc project — infrastructure setup': 'Έργο ad-hoc — εγκατάσταση υποδομής',
  'Ad-hoc project — completed works': 'Έργο ad-hoc — ολοκληρωμένες εργασίες',
  'Ad-hoc project — network handover': 'Έργο ad-hoc — παράδοση δικτύου',

  /* ---- Copper recovery ---- */
  'Copper recovery — overhead cable removal': 'Ανάκτηση χαλκού — αφαίρεση εναέριων καλωδίων',
  'Copper recovery — cable dismantling': 'Ανάκτηση χαλκού — αποξήλωση καλωδίων',
  'Copper recovery — coiling recovered cable': 'Ανάκτηση χαλκού — περιτύλιξη ανακτημένου καλωδίου',
  'Copper recovery — underground extraction': 'Ανάκτηση χαλκού — εξαγωγή από υπόγεια δίκτυα',
  'Copper recovery — cable drum': 'Ανάκτηση χαλκού — καρούλι καλωδίου',
  'Copper recovery — crew at work': 'Ανάκτηση χαλκού — συνεργείο σε εργασία',
  'Copper recovery — recovered material': 'Ανάκτηση χαλκού — ανακτημένο υλικό',
  'Copper recovery — site completed': 'Ανάκτηση χαλκού — ολοκληρωμένο εργοτάξιο',

  /* ---- Rhodes ---- */
  'Rhodes FTTH — medieval city works': 'FTTH Ρόδου — εργασίες στη μεσαιωνική πόλη',
  'Rhodes FTTH — cable installation': 'FTTH Ρόδου — εγκατάσταση καλωδίων',
  'Rhodes FTTH — street routing': 'FTTH Ρόδου — όδευση σε δρόμους',
  'Rhodes FTTH — distribution point': 'FTTH Ρόδου — σημείο διανομής',
  'Rhodes FTTH — crew on site': 'FTTH Ρόδου — συνεργείο στο πεδίο',
  'Rhodes FTTH — cabinet installation': 'FTTH Ρόδου — εγκατάσταση καμπίνας',
  'Rhodes FTTH — completed network': 'FTTH Ρόδου — ολοκληρωμένο δίκτυο',
  'Rhodes FTTH — project handover': 'FTTH Ρόδου — παράδοση έργου',

  /* ---- Trikala smart city ---- */
  'Trikala smart city — fibre access point': 'Έξυπνη πόλη Τρικάλων — σημείο πρόσβασης οπτικής ίνας',
  'Trikala smart city — street infrastructure': 'Έξυπνη πόλη Τρικάλων — υποδομές δρόμου',
  'Trikala smart city — network node': 'Έξυπνη πόλη Τρικάλων — κόμβος δικτύου',
  'Trikala smart city — open mall connectivity': 'Έξυπνη πόλη Τρικάλων — συνδεσιμότητα ανοιχτού εμπορικού κέντρου',
  'Trikala smart city — city-wide coverage': 'Έξυπνη πόλη Τρικάλων — κάλυψη σε όλη την πόλη',
  'Trikala smart city — smart infrastructure': 'Έξυπνη πόλη Τρικάλων — έξυπνες υποδομές',
  'Trikala smart city — installation crew': 'Έξυπνη πόλη Τρικάλων — συνεργείο εγκατάστασης',
  'Trikala smart city — completed project': 'Έξυπνη πόλη Τρικάλων — ολοκληρωμένο έργο',

  /* ---- Page titles ---- */
  'OSP Contractors | Telecom Infrastructure Specialists Since 1981': 'OSP Contractors | Ειδικοί στις Τηλεπικοινωνιακές Υποδομές από το 1981',
  'Our Company | OSP Contractors': 'Η Εταιρεία μας | OSP Contractors',
  'Services | OSP Contractors': 'Υπηρεσίες | OSP Contractors',
  'Significant Projects | OSP Contractors': 'Σημαντικά Έργα | OSP Contractors',
  'Certifications | OSP Contractors': 'Πιστοποιήσεις | OSP Contractors',
  'Contact Us | OSP Contractors': 'Επικοινωνία | OSP Contractors',
  'Privacy Policy | OSP Contractors': 'Πολιτική Απορρήτου | OSP Contractors',

  /* ---- Meta descriptions ---- */
  'Accessibility Statement | OSP Contractors': 'Δήλωση Προσβασιμότητας | OSP Contractors',
  'Accessibility statement of OSP Contractors: our WCAG 2.1 AA target, what we have done, known limitations and how to contact us.': 'Δήλωση προσβασιμότητας της OSP Contractors: ο στόχος μας WCAG 2.1 AA, όσα έχουμε κάνει, γνωστοί περιορισμοί και τρόποι επικοινωνίας.',
  'OSP Contractors designs, implements and maintains fixed telecom networks across Greece. Engineering, civil works, cable installation, splicing and more.': 'Η OSP Contractors σχεδιάζει, υλοποιεί και συντηρεί σταθερά δίκτυα τηλεπικοινωνιών σε όλη την Ελλάδα. Μελέτες, πολιτικά έργα, εγκατάσταση καλωδίων, συγκολλήσεις και άλλα.',
  'Learn about OSP Contractors — our history, mission, values and the experienced team behind Greece\'s telecom infrastructure projects.': 'Γνωρίστε την OSP Contractors — την ιστορία, την αποστολή, τις αξίες και την έμπειρη ομάδα πίσω από τα τηλεπικοινωνιακά έργα υποδομής στην Ελλάδα.',
  'OSP Contractors offers engineering services, civil works, cable installation, cable recovery, customer premises installation, and fibre splicing across Greece.': 'Η OSP Contractors προσφέρει υπηρεσίες μελετών, πολιτικά έργα, εγκατάσταση και ανάκτηση καλωδίων, εγκαταστάσεις σε χώρους πελατών και συγκόλληση οπτικών ινών σε όλη την Ελλάδα.',
  'A portfolio of significant telecom infrastructure projects delivered by OSP Contractors across Greece, including FTTH deployments, cable recovery and smart city projects.': 'Χαρτοφυλάκιο σημαντικών τηλεπικοινωνιακών έργων υποδομής της OSP Contractors σε όλη την Ελλάδα, με αναπτύξεις FTTH, ανάκτηση καλωδίων και έργα έξυπνης πόλης.',
  'OSP Contractors holds internationally recognised ISO certifications in quality management, occupational health & safety, and environmental management.': 'Η OSP Contractors διαθέτει διεθνώς αναγνωρισμένες πιστοποιήσεις ISO σε διαχείριση ποιότητας, υγεία και ασφάλεια στην εργασία και περιβαλλοντική διαχείριση.',
  'Get in touch with OSP Contractors. Offices in Athens and Trikala. Call +30 210 577 2107 or email info@osp-contractors.gr.': 'Επικοινωνήστε με την OSP Contractors. Γραφεία σε Αθήνα και Τρίκαλα. Τηλέφωνο +30 210 577 2107 ή email info@osp-contractors.gr.',
  'Privacy Policy for OSP Contractors — how we collect, use and protect your personal data in accordance with GDPR.': 'Πολιτική Απορρήτου της OSP Contractors — πώς συλλέγουμε, χρησιμοποιούμε και προστατεύουμε τα προσωπικά σας δεδομένα σύμφωνα με τον GDPR.'
};
