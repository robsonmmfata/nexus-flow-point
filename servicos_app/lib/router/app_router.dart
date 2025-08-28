import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../l10n/app_localizations.dart';
import '../features/features.dart';

GoRouter createAppRouter() {
  return GoRouter(
    routes: <RouteBase>[
      GoRoute(
        path: '/',
        name: 'home',
        builder: (BuildContext context, GoRouterState state) {
          final strings = AppLocalizations.of(context);
          return Scaffold(
            appBar: AppBar(title: Text(strings.homeTitle)),
            body: ListView(
              padding: const EdgeInsets.all(16),
              children: [
                _NavTile(label: strings.owners, route: '/owners'),
                _NavTile(label: strings.vehicles, route: '/vehicles'),
                _NavTile(label: strings.services, route: '/services'),
                _NavTile(label: strings.needs, route: '/needs'),
                _NavTile(label: strings.proposals, route: '/proposals'),
                _NavTile(label: strings.chat, route: '/chat'),
                _NavTile(label: strings.reports, route: '/reports'),
                _NavTile(label: strings.admin, route: '/admin'),
              ],
            ),
          );
        },
      ),
      GoRoute(path: '/owners', builder: (c, s) => const OwnersScreen()),
      GoRoute(path: '/vehicles', builder: (c, s) => const VehiclesScreen()),
      GoRoute(path: '/services', builder: (c, s) => const ServicesScreen()),
      GoRoute(path: '/needs', builder: (c, s) => const NeedsScreen()),
      GoRoute(path: '/proposals', builder: (c, s) => const ProposalsScreen()),
      GoRoute(path: '/chat', builder: (c, s) => const ChatScreen()),
      GoRoute(path: '/reports', builder: (c, s) => const ReportsScreen()),
      GoRoute(path: '/admin', builder: (c, s) => const AdminScreen()),
    ],
  );
}

class _NavTile extends StatelessWidget {
  final String label;
  final String route;

  const _NavTile({required this.label, required this.route});

  @override
  Widget build(BuildContext context) {
    return ListTile(
      title: Text(label),
      trailing: const Icon(Icons.chevron_right),
      onTap: () => GoRouter.of(context).push(route),
    );
  }
}

