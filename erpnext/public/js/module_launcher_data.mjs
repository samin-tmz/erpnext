const MODULES = [
	["Accounts", "Accounting", "calculator-duotone"],
	["Selling", "Sales", "storefront-duotone"],
	["Buying", "Purchase", "shopping-cart-duotone"],
	["Stock", "Inventory", "shelf-rack-duotone"],
	["Manufacturing", "Manufacturing", "factory-duotone"],
	["Projects", "Projects", "gantt-chart-duotone"],
	["CRM", "CRM", "launcher-crm"],
	["Support", "Support", "launcher-support"],
	["Assets", "Assets", "asset-hand-duotone"],
	["Quality", "Quality", "quality-seal-duotone"],
	["GST India", "GST India", "launcher-gst"],
	["Income Tax India", "Income Tax", "launcher-income-tax"],
	["Audit Trail", "Audit Trail", "launcher-audit"],
	["Website", "Website", "website-browser-duotone"],
	["Contacts", "Contacts", "contacts-cards-duotone"],
	["Email", "Email", "email-envelope-duotone"],
	["Users", "Users", "users-duotone"],
	["Workflow", "Workflow", "workflow-builder-duotone"],
	["Automation", "Automation", "automation-cycle-duotone"],
	["Data", "Data", "data-table-duotone"],
	["Printing", "Printing", "printing-printer-duotone"],
	["Integrations", "Integrations", "integrations-puzzle-duotone"],
	["Setup", "ERP Settings", "sliders-duotone"],
	["Build", "Customization", "code-app-duotone"],
	["System", "System", "system-monitor-duotone"],
	["Geo", "Locations", "geo-globe-duotone"],
	["VAT India", "VAT India", "launcher-vat"],
];

export function get_launcher_modules(sidebars, get_route) {
	const definitions = new Map(
		MODULES.map(([name, label, icon], order) => [name, { label, icon, order }])
	);
	return Object.entries(sidebars)
		.filter(([name]) => name !== "Private")
		.map(([name, sidebar]) => {
			const definition = definitions.get(name);
			return {
				name,
				label: definition?.label || sidebar.label || name,
				icon: definition?.icon || sidebar.header_icon || "layers",
				order: definition?.order ?? MODULES.length,
				route: get_route(name),
			};
		})
		.filter((item) => item.route)
		.sort((a, b) => a.order - b.order || a.label.localeCompare(b.label));
}
