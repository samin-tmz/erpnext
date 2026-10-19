import { get_launcher_modules } from "./module_launcher_data.mjs";

$(document).on("desktop_screen.erpnext_module_launcher", (event, { desktop }) => {
	if (frappe.boot.desktop_page !== "Apps") return;

	const sidebar = frappe.app.sidebar;
	const modules = get_launcher_modules(frappe.boot.module_sidebars || {}, (name) =>
		sidebar.module_landing_route(name)
	);
	const $grid = desktop.wrapper.find(".icons");
	$grid.empty().removeAttr("style").addClass("erpnext-module-launcher");
	desktop.wrapper.addClass("erpnext-launcher-container");

	for (const item of modules) {
		const $tile = $("<a>", { class: "erpnext-module-tile", href: item.route });
		const $image = $("<span>", { class: "erpnext-module-image", "aria-hidden": "true" });
		if (item.icon.startsWith("launcher-")) {
			$image.html(
				`<svg viewBox="0 0 24 24" focusable="false"><use href="/assets/erpnext/icons/launcher-icons.svg#${encodeURIComponent(
					item.icon
				)}"></use></svg>`
			);
		} else {
			$image.html(frappe.utils.icon(item.icon, "xl"));
		}
		$tile.append($image, $("<span>", { class: "erpnext-module-label", text: __(item.label) }));
		$grid.append($tile);
	}

	for (const app of frappe.boot.app_data || []) {
		if (!app.on_apps_screen) continue;
		const route = sidebar.app_landing_route(app);
		if (!route) continue;
		const has_modules = modules.some(
			(item) => frappe.boot.module_sidebars[item.name].app === app.app_name
		);
		if (has_modules && sidebar.is_desk_route(route)) continue;
		desktop.add_icon(
			$grid,
			{ label: app.app_title, logo_url: app.app_logo_url, desk_route: app.desk_route },
			route
		);
	}
});
