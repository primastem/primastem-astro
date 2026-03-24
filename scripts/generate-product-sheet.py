"""
PrimaSTEM Product Sheet — Premium 2-page PDF for distributors.
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor, white
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER
from reportlab.platypus import (
    BaseDocTemplate, Frame, PageTemplate,
    Paragraph, Spacer, Table, TableStyle, Image
)
from svglib.svglib import svg2rlg
import os

# --- PATHS ---
BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUTPUT = os.path.join(BASE, "public", "primastem-product-sheet.pdf")
LOGO_SVG = os.path.join(BASE, "public", "logo.svg")
HERO_IMG = os.path.join(BASE, "src", "assets", "hero-primastem.png")

# --- COLORS ---
GREEN = HexColor("#5AA02C")
DARK = HexColor("#1e293b")
TEXT = HexColor("#334155")
GRAY = HexColor("#64748b")
LIGHT_GRAY = HexColor("#94a3b8")
DIVIDER = HexColor("#e2e8f0")
BG_ALT = HexColor("#f8fafc")
WHITE = white

# --- PAGE ---
W, H = A4
ML, MR, MT, MB = 25*mm, 25*mm, 20*mm, 18*mm
CW = W - ML - MR

# --- STYLES ---
ST = {}
ST['tagline'] = ParagraphStyle('Tagline', fontName='Helvetica', fontSize=12, textColor=GRAY, leading=16, spaceAfter=0)
ST['desc'] = ParagraphStyle('Desc', fontName='Helvetica', fontSize=9, textColor=TEXT, leading=13, spaceAfter=0)
ST['h1'] = ParagraphStyle('H1', fontName='Helvetica-Bold', fontSize=10, textColor=GREEN, spaceBefore=0, spaceAfter=4*mm, leading=13)
ST['body'] = ParagraphStyle('Body', fontName='Helvetica', fontSize=8.5, textColor=TEXT, leading=12, spaceAfter=2*mm)
ST['bullet'] = ParagraphStyle('Bullet', fontName='Helvetica', fontSize=8.5, textColor=TEXT, leading=12, leftIndent=4*mm, bulletIndent=0, spaceAfter=2*mm)
ST['price'] = ParagraphStyle('Price', fontName='Helvetica-Bold', fontSize=13, textColor=GREEN, spaceBefore=0, spaceAfter=2*mm)
ST['small'] = ParagraphStyle('Small', fontName='Helvetica', fontSize=7.5, textColor=LIGHT_GRAY, leading=10)
ST['contact_name'] = ParagraphStyle('CN', fontName='Helvetica-Bold', fontSize=9, textColor=DARK, alignment=TA_CENTER, spaceAfter=1.5*mm)
ST['contact'] = ParagraphStyle('C', fontName='Helvetica', fontSize=8.5, textColor=TEXT, alignment=TA_CENTER, leading=13)
ST['url'] = ParagraphStyle('URL', fontName='Helvetica-Bold', fontSize=10, textColor=GREEN, alignment=TA_CENTER, spaceBefore=2*mm)


def sp(h=3): return Spacer(1, h*mm)

def div():
    t = Table([['']], colWidths=[CW], rowHeights=[0.4*mm])
    t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,-1),GREEN),('TOPPADDING',(0,0),(-1,-1),0),('BOTTOMPADDING',(0,0),(-1,-1),0)]))
    return t

def thin():
    t = Table([['']], colWidths=[CW], rowHeights=[0.25*mm])
    t.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,-1),DIVIDER),('TOPPADDING',(0,0),(-1,-1),0),('BOTTOMPADDING',(0,0),(-1,-1),0)]))
    return t

def tbl_style():
    return TableStyle([
        ('FONTNAME',(0,0),(0,-1),'Helvetica-Bold'),
        ('FONTNAME',(1,0),(1,-1),'Helvetica'),
        ('FONTSIZE',(0,0),(-1,-1),8),
        ('TEXTCOLOR',(0,0),(-1,-1),TEXT),
        ('ROWBACKGROUNDS',(0,0),(-1,-1),[WHITE,BG_ALT]),
        ('TOPPADDING',(0,0),(-1,-1),3),
        ('BOTTOMPADDING',(0,0),(-1,-1),3),
        ('LEFTPADDING',(0,0),(-1,-1),3),
        ('LINEBELOW',(0,0),(-1,-2),0.25,DIVIDER),
    ])

def footer_fn(c, doc):
    c.saveState()
    c.setFont('Helvetica',7)
    c.setFillColor(LIGHT_GRAY)
    c.drawCentredString(W/2, 10*mm, "PrimaSTEM SAS  ·  info@primastem.com  ·  www.primastem.com")
    c.restoreState()


def build():
    frame = Frame(ML, MB, CW, H-MT-MB, id='main')
    doc = BaseDocTemplate(OUTPUT, pagesize=A4, pageTemplates=[PageTemplate(id='main', frames=frame, onPage=footer_fn)])
    s = []

    # LOGO
    try:
        d = svg2rlg(LOGO_SVG)
        if d:
            sc = 36/d.height; d.width*=sc; d.height*=sc; d.scale(sc,sc)
            s.append(d)
    except: pass

    s.append(sp(4))

    # TAGLINE + DESCRIPTION (left) + IMAGE (right) — two columns
    s.append(Paragraph("Screen-free coding and mathematics. Ages 4–10. Made from wood.", ST['tagline']))
    s.append(sp(4))

    desc_text = (
        "<b>PrimaSTEM</b> is a wooden programmable robot that teaches both coding "
        "and mathematics without a screen. Children place NFC command tokens on a "
        "tangible control board to build programs they can see and touch.<br/><br/>"
        "Two curriculum levels in one device: logic for ages 4–7 and real mathematics "
        "for ages 7–10. The robot draws geometric figures — stars, spirals, polygons — "
        "making math visible.<br/><br/>"
        "CE &amp; UKCA certified.<br/>"
        "Made in Cannes, France.<br/>"
        "Complete kit with online lesson plans in 10 languages."
    )
    desc_para = Paragraph(desc_text, ST['desc'])

    try:
        img = Image(HERO_IMG)
        img_col_w = CW * 0.45
        r = img_col_w / img.imageWidth
        img._restrictSize(img.imageWidth * r, img.imageHeight * r)

        hero_table = Table(
            [[desc_para, img]],
            colWidths=[CW * 0.52, CW * 0.48]
        )
        hero_table.setStyle(TableStyle([
            ('VALIGN', (0, 0), (-1, -1), 'TOP'),
            ('LEFTPADDING', (0, 0), (0, 0), 0),
            ('RIGHTPADDING', (1, 0), (1, 0), 0),
            ('LEFTPADDING', (1, 0), (1, 0), 4*mm),
            ('TOPPADDING', (0, 0), (-1, -1), 0),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 0),
        ]))
        s.append(hero_table)
    except:
        s.append(desc_para)

    s.append(sp(4))
    s.append(div())
    s.append(sp(4))

    # KEY ADVANTAGES
    s.append(Paragraph("KEY ADVANTAGES", ST['h1']))
    for b in [
        "<b>Two age groups — one device.</b> Logic 4–7, mathematics 7–10. One purchase for all of primary school.",
        "<b>The robot draws.</b> Stars, spirals, polygons, fractals — the demo moment that sells.",
        "<b>Works with existing maps.</b> Step size: 10, 12, 15, 25 cm. Any grid map.",
        "<b>Open NFC platform.</b> Custom tokens via free phone app. Sound maps, language cards.",
        "<b>Voice feedback &amp; accessibility.</b> Board speaks each command. Braille version in testing.",
    ]:
        s.append(Paragraph(f"●&nbsp;&nbsp;{b}", ST['bullet']))

    s.append(sp(2))
    s.append(thin())
    s.append(sp(4))

    # WHAT'S IN THE KIT
    s.append(Paragraph("WHAT'S IN THE KIT", ST['h1']))
    c1, c2 = 38*mm, CW-38*mm
    kit = Table([
        ["Ladybug robot","125 mm ⌀, wood, USB-C, Bluetooth, 2–3 h battery"],
        ["Control board","317 × 217 mm, wood, 11 dual slots"],
        ["Command tokens","33 × 33 mm, NFC 13.56 MHz, Scratch color coding"],
        ["Teacher's guide","Online: lesson plans, printables at docs.primastem.com"],
    ], colWidths=[c1,c2])
    kit.setStyle(tbl_style())
    s.append(kit)

    s.append(sp(2))
    s.append(thin())
    s.append(sp(4))

    # COMMANDS
    s.append(Paragraph("COMMANDS", ST['h1']))
    cmd = Table([
        ["Movement & Program","Forward, Backward, Left, Right, Random, Function, Pause"],
        ["Repeat","2–999, Random repeat 1–6"],
        ["Mathematics","+, −, ×, ÷, √, ^"],
        ["Numbers","1–999"],
        ["System","Default step size (adjustable), calibration"],
    ], colWidths=[c1,c2])
    cmd.setStyle(tbl_style())
    s.append(cmd)

    s.append(sp(2))
    s.append(thin())
    s.append(sp(4))

    # TECHNICAL SPECIFICATIONS (two-column table)
    s.append(Paragraph("TECHNICAL SPECIFICATIONS", ST['h1']))
    hw = CW/2 - 1*mm
    lw, vw = 28*mm, hw-28*mm
    rows = [
        ["Material","Wood","Connectivity","Bluetooth ~5 m"],
        ["Robot","125 mm ⌀, 44 mm H","Battery","Li-Ion, USB-C, 2–3 h"],
        ["Control board","317 × 217 mm","Default step","15 cm (adjustable)"],
        ["Tokens","33 × 33 mm, NFC","Angles","1°–360°"],
        ["Slots","6×2 main + 5×2 func","Certification","CE, UKCA"],
        ["Audio","Voice + sounds","Age","4–10"],
        ["Made in","Cannes, France","",""],
    ]
    spec = Table(rows, colWidths=[lw,vw,lw,vw])
    spec.setStyle(TableStyle([
        ('FONTNAME',(0,0),(0,-1),'Helvetica-Bold'),
        ('FONTNAME',(2,0),(2,-1),'Helvetica-Bold'),
        ('FONTNAME',(1,0),(1,-1),'Helvetica'),
        ('FONTNAME',(3,0),(3,-1),'Helvetica'),
        ('FONTSIZE',(0,0),(-1,-1),8),
        ('TEXTCOLOR',(0,0),(-1,-1),TEXT),
        ('ROWBACKGROUNDS',(0,0),(-1,-1),[WHITE,BG_ALT]),
        ('TOPPADDING',(0,0),(-1,-1),3),
        ('BOTTOMPADDING',(0,0),(-1,-1),3),
        ('LEFTPADDING',(0,0),(-1,-1),3),
        ('LINEBELOW',(0,0),(-1,-2),0.25,DIVIDER),
    ]))
    s.append(spec)

    s.append(sp(3))
    s.append(div())
    s.append(sp(4))

    # WHOLESALE PRICING
    s.append(Paragraph("WHOLESALE PRICING", ST['h1']))
    s.append(Paragraph("From €220 excl. VAT per kit.", ST['price']))
    s.append(Paragraph(
        "Marketing materials in your language. Technical support. "
        "Joint participation at trade shows. Territory exclusivity negotiable.", ST['body']))
    s.append(Paragraph(
        "Minimum order quantities, shipping terms, and lead times — discussed individually.", ST['body']))

    s.append(sp(2))
    s.append(thin())
    s.append(sp(4))

    # DOCUMENTATION
    s.append(Paragraph("DOCUMENTATION &amp; SUPPORT", ST['h1']))
    s.append(Paragraph("Full documentation: <b>docs.primastem.com</b> — 10 languages. "
        "Video tutorials: <b>youtube.com/@primastem</b>. Technical support included.", ST['body']))

    s.append(sp(2))
    s.append(thin())
    s.append(sp(4))

    # PRESENT IN
    s.append(Paragraph("PRESENT IN", ST['h1']))
    s.append(Paragraph("France (direct sales), Netherlands, Norway, Luxembourg, Spain. Expanding.", ST['body']))
    s.append(Paragraph("Trade shows: EDUCATECH (Paris), SIMO Educación (Madrid), SpielwarenMesse (Nuremberg).", ST['small']))

    s.append(sp(6))
    s.append(div())
    s.append(sp(5))

    # CONTACT
    s.append(Paragraph("PrimaSTEM SAS", ST['contact_name']))
    s.append(Paragraph(
        "info@primastem.com&nbsp;&nbsp;·&nbsp;&nbsp;+33 6 24 95 09 36 (WhatsApp)&nbsp;&nbsp;·&nbsp;&nbsp;Cannes, France",
        ST['contact']))
    s.append(Paragraph("www.primastem.com", ST['url']))

    doc.build(s)
    print(f"PDF saved: {OUTPUT}")

if __name__ == "__main__":
    build()
