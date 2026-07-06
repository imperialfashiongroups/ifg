import { Order } from '@/types/database';

const BRAND_COLOR = '#C9A84C';
const BRAND_NAME = 'Imperial Fashion Groups';
const BRAND_EMAIL = 'imperialfashiongroups@gmail.com';
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://imperialfashiongroups.com';

function emailBase(title: string, bodyHtml: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f4;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#1A1A1A 0%,#2d2d2d 100%);padding:32px 40px;text-align:center;">
            <h1 style="color:${BRAND_COLOR};font-size:26px;font-weight:800;margin:0;letter-spacing:2px;">${BRAND_NAME.toUpperCase()}</h1>
            <p style="color:#aaa;font-size:13px;margin:6px 0 0;letter-spacing:1px;">WEAR YOUR ATTITUDE</p>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:40px;">
            ${bodyHtml}
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background:#1A1A1A;padding:24px 40px;text-align:center;">
            <p style="color:#888;font-size:12px;margin:0 0 8px;">GST: 22ASVPC0275C1Z4 | ${BRAND_EMAIL}</p>
            <p style="color:#888;font-size:12px;margin:0 0 8px;">401, Atlantis Complex, Raipur Bypass, Telibandha, Raipur, CG - 492001</p>
            <p style="color:#666;font-size:11px;margin:8px 0 0;">
              <a href="${APP_URL}/policies/privacy" style="color:${BRAND_COLOR};text-decoration:none;">Privacy Policy</a> &nbsp;|&nbsp;
              <a href="${APP_URL}/policies/return" style="color:${BRAND_COLOR};text-decoration:none;">Return Policy</a> &nbsp;|&nbsp;
              <a href="${APP_URL}/policies/shipping" style="color:${BRAND_COLOR};text-decoration:none;">Shipping Policy</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function statusBadge(status: string, color: string) {
  return `<span style="background:${color};color:#fff;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600;text-transform:uppercase;">${status}</span>`;
}

function orderItemsTable(order: Order): string {
  const rows = (order.items || []).map(item => `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;">
        <strong style="color:#1A1A1A;">${item.product_name}</strong>
        ${item.variant_name ? `<br><span style="color:#888;font-size:13px;">${item.variant_name}</span>` : ''}
      </td>
      <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;text-align:center;color:#666;">×${item.quantity}</td>
      <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;text-align:right;color:#1A1A1A;font-weight:600;">₹${item.total_price.toFixed(2)}</td>
    </tr>`).join('');

  return `
    <table width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;">
      <thead>
        <tr style="background:#f9f9f9;">
          <th style="padding:10px;text-align:left;color:#888;font-size:13px;font-weight:500;">Item</th>
          <th style="padding:10px;text-align:center;color:#888;font-size:13px;font-weight:500;">Qty</th>
          <th style="padding:10px;text-align:right;color:#888;font-size:13px;font-weight:500;">Total</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
      <tfoot>
        <tr>
          <td colspan="2" style="padding:10px 0;color:#666;font-size:13px;">Subtotal</td>
          <td style="padding:10px 0;text-align:right;color:#666;">₹${order.subtotal.toFixed(2)}</td>
        </tr>
        <tr>
          <td colspan="2" style="padding:4px 0;color:#666;font-size:13px;">GST</td>
          <td style="padding:4px 0;text-align:right;color:#666;">₹${order.gst_amount.toFixed(2)}</td>
        </tr>
        ${order.discount_amount > 0 ? `
        <tr>
          <td colspan="2" style="padding:4px 0;color:#22c55e;font-size:13px;">Discount</td>
          <td style="padding:4px 0;text-align:right;color:#22c55e;">-₹${order.discount_amount.toFixed(2)}</td>
        </tr>` : ''}
        <tr>
          <td colspan="2" style="padding:10px 0;color:#1A1A1A;font-weight:700;font-size:15px;border-top:2px solid #1A1A1A;">Total</td>
          <td style="padding:10px 0;text-align:right;color:${BRAND_COLOR};font-weight:700;font-size:15px;border-top:2px solid #1A1A1A;">₹${order.total_amount.toFixed(2)}</td>
        </tr>
      </tfoot>
    </table>`;
}

// ============================================================
// ORDER CONFIRMATION
// ============================================================
export function orderConfirmationEmail(order: Order, customerName: string): string {
  const body = `
    <h2 style="color:#1A1A1A;font-size:24px;margin:0 0 8px;">Order Confirmed! 🎉</h2>
    <p style="color:#555;margin:0 0 24px;">Hi ${customerName}, thank you for shopping with us. Your order has been placed successfully.</p>

    <div style="background:#f9f6ef;border-left:4px solid ${BRAND_COLOR};padding:16px 20px;border-radius:0 8px 8px 0;margin:0 0 24px;">
      <p style="margin:0;color:#1A1A1A;font-size:14px;"><strong>Order Number:</strong> ${order.order_number}</p>
      <p style="margin:6px 0 0;color:#1A1A1A;font-size:14px;"><strong>Payment:</strong> ${order.payment_method === 'cod' ? 'Cash on Delivery' : 'Online (Razorpay)'}</p>
      <p style="margin:6px 0 0;color:#1A1A1A;font-size:14px;"><strong>Expected Delivery:</strong> 3–5 business days</p>
    </div>

    ${orderItemsTable(order)}

    <div style="margin:24px 0;">
      <h4 style="color:#1A1A1A;margin:0 0 8px;">Delivering to:</h4>
      <p style="color:#555;margin:0;line-height:1.6;">
        ${order.shipping_name}<br>
        ${order.shipping_address1}${order.shipping_address2 ? ', ' + order.shipping_address2 : ''}<br>
        ${order.shipping_city}, ${order.shipping_state} - ${order.shipping_pincode}<br>
        Phone: ${order.shipping_phone}
      </p>
    </div>

    <div style="text-align:center;margin:32px 0;">
      <a href="${APP_URL}/account/orders/${order.id}" style="background:${BRAND_COLOR};color:#1A1A1A;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:700;font-size:15px;display:inline-block;">Track Your Order</a>
    </div>

    <p style="color:#888;font-size:13px;margin:24px 0 0;">Have questions? Reply to this email or write to us at <a href="mailto:${BRAND_EMAIL}" style="color:${BRAND_COLOR};">${BRAND_EMAIL}</a></p>`;

  return emailBase(`Order Confirmed — ${order.order_number} | ${BRAND_NAME}`, body);
}

// ============================================================
// ORDER SHIPPED
// ============================================================
export function orderShippedEmail(order: Order, customerName: string): string {
  const body = `
    <h2 style="color:#1A1A1A;font-size:24px;margin:0 0 8px;">Your Order is on the Way! 🚚</h2>
    <p style="color:#555;margin:0 0 24px;">Hi ${customerName}, great news! Your order <strong>${order.order_number}</strong> has been shipped.</p>

    <div style="background:#f0f9f0;border-left:4px solid #22c55e;padding:16px 20px;border-radius:0 8px 8px 0;margin:0 0 24px;">
      ${order.courier_name ? `<p style="margin:0;color:#1A1A1A;font-size:14px;"><strong>Courier:</strong> ${order.courier_name}</p>` : ''}
      ${order.tracking_id ? `<p style="margin:6px 0 0;color:#1A1A1A;font-size:14px;"><strong>Tracking ID:</strong> ${order.tracking_id}</p>` : ''}
      <p style="margin:6px 0 0;color:#1A1A1A;font-size:14px;"><strong>Expected Delivery:</strong> 2–3 business days</p>
    </div>

    <div style="text-align:center;margin:32px 0;">
      <a href="${APP_URL}/account/orders/${order.id}" style="background:${BRAND_COLOR};color:#1A1A1A;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:700;font-size:15px;display:inline-block;">Track Shipment</a>
    </div>`;

  return emailBase(`Order Shipped — ${order.order_number} | ${BRAND_NAME}`, body);
}

// ============================================================
// ORDER DELIVERED
// ============================================================
export function orderDeliveredEmail(order: Order, customerName: string): string {
  const body = `
    <h2 style="color:#1A1A1A;font-size:24px;margin:0 0 8px;">Order Delivered! ✅</h2>
    <p style="color:#555;margin:0 0 24px;">Hi ${customerName}, your order <strong>${order.order_number}</strong> has been delivered. We hope you love it!</p>

    <div style="text-align:center;margin:32px 0;">
      <a href="${APP_URL}/account/orders/${order.id}" style="background:${BRAND_COLOR};color:#1A1A1A;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:700;font-size:15px;display:inline-block;">Write a Review</a>
    </div>

    <p style="color:#888;font-size:13px;text-align:center;margin:0;">Not satisfied? You have 7 days to <a href="${APP_URL}/account/returns" style="color:${BRAND_COLOR};">request a return</a>.</p>`;

  return emailBase(`Order Delivered — ${order.order_number} | ${BRAND_NAME}`, body);
}

// ============================================================
// RETURN REQUEST RECEIVED
// ============================================================
export function returnRequestEmail(orderNumber: string, customerName: string, reason: string): string {
  const body = `
    <h2 style="color:#1A1A1A;font-size:24px;margin:0 0 8px;">Return Request Received 📦</h2>
    <p style="color:#555;margin:0 0 24px;">Hi ${customerName}, we've received your return request for order <strong>${orderNumber}</strong>.</p>

    <div style="background:#fff8f0;border-left:4px solid ${BRAND_COLOR};padding:16px 20px;border-radius:0 8px 8px 0;margin:0 0 24px;">
      <p style="margin:0;color:#1A1A1A;font-size:14px;"><strong>Reason:</strong> ${reason}</p>
      <p style="margin:6px 0 0;color:#555;font-size:14px;">Our team will review your request within 1–2 business days and get back to you.</p>
      <p style="margin:6px 0 0;color:#555;font-size:14px;">Refunds are processed within 3–5 business days after pickup.</p>
    </div>

    <div style="text-align:center;margin:32px 0;">
      <a href="${APP_URL}/account/returns" style="background:${BRAND_COLOR};color:#1A1A1A;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:700;font-size:15px;display:inline-block;">Track Return Status</a>
    </div>`;

  return emailBase(`Return Request — ${orderNumber} | ${BRAND_NAME}`, body);
}

// ============================================================
// REFUND INITIATED
// ============================================================
export function refundInitiatedEmail(orderNumber: string, customerName: string, amount: number): string {
  const body = `
    <h2 style="color:#1A1A1A;font-size:24px;margin:0 0 8px;">Refund Initiated 💰</h2>
    <p style="color:#555;margin:0 0 24px;">Hi ${customerName}, your refund for order <strong>${orderNumber}</strong> has been initiated.</p>

    <div style="background:#f0fff4;border-left:4px solid #22c55e;padding:16px 20px;border-radius:0 8px 8px 0;margin:0 0 24px;">
      <p style="margin:0;color:#1A1A1A;font-size:14px;"><strong>Refund Amount:</strong> ₹${amount.toFixed(2)}</p>
      <p style="margin:6px 0 0;color:#555;font-size:14px;">The amount will be credited to your original payment method within 3–5 business days.</p>
    </div>`;

  return emailBase(`Refund Initiated — ${orderNumber} | ${BRAND_NAME}`, body);
}
