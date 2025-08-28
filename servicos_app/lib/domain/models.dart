import 'package:freezed_annotation/freezed_annotation.dart';

part 'models.freezed.dart';
part 'models.g.dart';

enum UserRole { owner, provider, admin }

@freezed
class AppUser with _$AppUser {
  const factory AppUser({
    required String id,
    required String name,
    required String email,
    required UserRole role,
    String? phone,
    double? rating,
  }) = _AppUser;

  factory AppUser.fromJson(Map<String, dynamic> json) => _$AppUserFromJson(json);
}

@freezed
class Vehicle with _$Vehicle {
  const factory Vehicle({
    required String id,
    required String ownerId,
    required String plate,
    required String model,
    required String make,
    int? year,
  }) = _Vehicle;

  factory Vehicle.fromJson(Map<String, dynamic> json) => _$VehicleFromJson(json);
}

enum ServiceType { carPickup, expressWash, delivery }

@freezed
class ServiceDefinition with _$ServiceDefinition {
  const factory ServiceDefinition({
    required String id,
    required ServiceType type,
    required String name,
    String? description,
  }) = _ServiceDefinition;

  factory ServiceDefinition.fromJson(Map<String, dynamic> json) => _$ServiceDefinitionFromJson(json);
}

@freezed
class GeoPoint with _$GeoPoint {
  const factory GeoPoint({
    required double latitude,
    required double longitude,
  }) = _GeoPoint;

  factory GeoPoint.fromJson(Map<String, dynamic> json) => _$GeoPointFromJson(json);
}

@freezed
class Need with _$Need {
  const factory Need({
    required String id,
    required String ownerId,
    required String vehicleId,
    required ServiceType serviceType,
    required GeoPoint location,
    required DateTime createdAt,
    List<String>? requiredPhotos,
    Map<String, dynamic>? extra,
  }) = _Need;

  factory Need.fromJson(Map<String, dynamic> json) => _$NeedFromJson(json);
}

@freezed
class Proposal with _$Proposal {
  const factory Proposal({
    required String id,
    required String needId,
    required String providerId,
    required int cents,
    required DateTime createdAt,
  }) = _Proposal;

  factory Proposal.fromJson(Map<String, dynamic> json) => _$ProposalFromJson(json);
}

@freezed
class PaymentSummary with _$PaymentSummary {
  const factory PaymentSummary({
    required int serviceCents,
    required int platformFeeCents,
    required int taxCents,
  }) = _PaymentSummary;

  factory PaymentSummary.fromJson(Map<String, dynamic> json) => _$PaymentSummaryFromJson(json);
}

